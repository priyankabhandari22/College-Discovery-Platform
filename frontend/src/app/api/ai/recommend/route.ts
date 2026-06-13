import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getCollegeDetailById } from '@/data/college-details';
import { SEED_COLLEGES } from '@/data/seed-colleges';

function getGenAI() {
  const key = process.env.GOOGLE_GEMINI_API_KEY;
  if (!key) throw new Error('GOOGLE_GEMINI_API_KEY not set');
  return new GoogleGenerativeAI(key);
}

function percentileToRank(percentile: number, exam: string): number {
  const totalStudents: Record<string, number> = {
    'JEE Main': 1200000,
    'JEE Advanced': 250000,
    'MHT-CET': 150000,
    'NEET': 1800000,
    'GATE': 1000000,
    'CAT': 300000,
  };
  const total = totalStudents[exam] || 500000;
  return Math.round(total * (1 - percentile / 100));
}

function marksToRank(marks: number, maxMarks: number, _exam: string): number {
  const pct = marks / maxMarks;
  if (pct >= 0.99) return Math.round(1 + (1 - pct) * 1000);
  if (pct >= 0.9) return Math.round(1000 + (0.99 - pct) * 90000);
  return Math.round(100000 + (0.9 - pct) * 900000);
}

function generateLocalAdvice(topColleges: NonNullable<ReturnType<typeof getCollegeDetailById>>[], resolvedRank: number, exam: string): string {
  const sorted = [...topColleges].sort((a, b) => b.rating - a.rating);
  const lines: string[] = [];
  lines.push(`📊 Personalized College Recommendations for ${exam} Rank ~${resolvedRank.toLocaleString('en-IN')}`);
  lines.push('');
  lines.push('Based on your rank, here are the best matching colleges ranked by overall rating:');
  lines.push('');
  sorted.slice(0, 5).forEach((c, i) => {
    lines.push(`${i + 1}. ${c.name}, ${c.location}`);
    lines.push(`   ⭐ Rating: ${c.rating}/5 · Fees: ₹${c.fees.toLocaleString('en-IN')}/yr`);
    lines.push(`   📈 Placement: ${c.placementPercentage}% · Avg CTC: ₹${c.placements.avgCTC}L · Highest: ₹${c.placements.highestCTC}L`);
    const cutoff = c.cutoffs[exam];
    if (cutoff) lines.push(`   🎯 Cutoff range: Rank ${cutoff.min.toLocaleString('en-IN')} - ${cutoff.max.toLocaleString('en-IN')}`);
    lines.push(`   🏢 Top recruiters: ${c.placements.topRecruiters.slice(0, 3).join(', ')}`);
    lines.push('');
  });
  lines.push('💡 Tips:');
  lines.push('• Check each college\'s official website for the latest cutoff trends.');
  lines.push('• Consider factors like location, specialization, and campus facilities.');
  lines.push('• Higher-rated colleges with strong placement records are generally preferred.');
  return lines.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const genAI = getGenAI();

    const body = await request.json();
    const { exam, rank, marks, maxMarks, percentile, preferredLocation, preferredStream } = body;

    let resolvedRank = rank;
    if (!resolvedRank && marks && maxMarks) {
      resolvedRank = marksToRank(Number(marks), Number(maxMarks), exam);
    } else if (!resolvedRank && percentile) {
      resolvedRank = percentileToRank(Number(percentile), exam);
    }

    if (!resolvedRank || resolvedRank < 1) {
      return NextResponse.json({ error: 'Provide rank, marks, or percentile' }, { status: 400 });
    }

    const allColleges = SEED_COLLEGES.map((s) => getCollegeDetailById(s.id)).filter(Boolean) as NonNullable<ReturnType<typeof getCollegeDetailById>>[];
    const withCutoff = allColleges.filter((c) => c.cutoffs?.[exam]);

    let matching = withCutoff.filter((c) => resolvedRank >= c.cutoffs[exam].min && resolvedRank <= c.cutoffs[exam].max * 1.1);
    if (matching.length === 0) {
      matching = withCutoff.filter((c) => resolvedRank >= c.cutoffs[exam].min && resolvedRank <= c.cutoffs[exam].max * 3)
        .sort((a, b) => b.cutoffs[exam].max - a.cutoffs[exam].max);
    }
    if (matching.length === 0) {
      matching = withCutoff.sort((a, b) => b.cutoffs[exam].max - a.cutoffs[exam].max).slice(0, 10);
    }

    if (matching.length === 0) {
      return NextResponse.json({ recommendations: [], summary: 'No colleges match your current profile in our dataset.' });
    }

    let filtered = [...matching];
    if (preferredLocation) {
      const loc = preferredLocation.toLowerCase();
      filtered = filtered.filter((c) => c.location.toLowerCase().includes(loc));
    }
    if (preferredStream) {
      const stream = preferredStream.toLowerCase();
      filtered = filtered.filter((c) => c.stream.toLowerCase().includes(stream));
    }

    const topColleges = filtered.slice(0, 10);
    const collegeData = topColleges.map((c) => ({
      name: c.name, location: c.location, rating: c.rating, fees: c.fees,
      placementPct: c.placementPercentage, avgCTC: c.placements.avgCTC,
      highestCTC: c.placements.highestCTC, cutoffs: c.cutoffs[exam],
      topRecruiters: c.placements.topRecruiters.slice(0, 3),
    }));

    // Try Gemini, fall back to local advice on quota error
    let aiAdvice: string;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are an experienced college admission counselor for Indian engineering and professional colleges.

Student Profile:
- Exam: ${exam}
- Rank: ~${resolvedRank}${marks ? ` (${marks}/${maxMarks} marks)` : ''}${percentile ? ` (${percentile} percentile)` : ''}
- Preferred Location: ${preferredLocation || 'Any'}
- Preferred Stream: ${preferredStream || 'Any'}

Here are the colleges this student might get into, with their data as JSON:
${JSON.stringify(collegeData, null, 2)}

Based on the student's rank and preferences, analyze these colleges and provide:
1. A personalized summary (2-3 sentences) of the student's options
2. Top 3-5 recommended colleges ranked by suitability, with brief reasoning for each
3. For each recommended college, mention: why it's a good fit, placement strength, fees value, and cutoff match
4. Any tips or suggestions for the student

Format your response as plain text with clear sections. Be honest and data-driven. Don't recommend colleges that aren't in the data above.`;
      const result = await model.generateContent(prompt);
      aiAdvice = result.response.text();
    } catch {
      aiAdvice = generateLocalAdvice(topColleges, resolvedRank, exam);
    }

    return NextResponse.json({
      recommendations: topColleges.map((c) => ({
        id: c.id, name: c.name, location: c.location, rating: c.rating,
        fees: c.fees, placementPercentage: c.placementPercentage,
        avgCTC: c.placements.avgCTC, highestCTC: c.placements.highestCTC,
      })),
      aiAdvice,
      summary: `Found ${matching.length} matching colleges${preferredLocation || preferredStream ? ` (${filtered.length} after filters)` : ''}.`,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'AI recommendation failed';
    console.error('AI recommend error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
