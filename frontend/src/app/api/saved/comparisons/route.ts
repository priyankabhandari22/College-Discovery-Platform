import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const saveComparisonSchema = z.object({
  collegeIds: z.array(z.string()).min(1).max(10),
  label: z.string().min(1, 'Label is required'),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const comparisons = await prisma.savedComparison.findMany({
    where: { userId: session.user.id },
    orderBy: { savedAt: 'desc' },
  });

  return NextResponse.json(comparisons);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = saveComparisonSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const comparison = await prisma.savedComparison.create({
    data: {
      userId: session.user.id,
      collegeIds: parsed.data.collegeIds,
      label: parsed.data.label,
    },
  });

  return NextResponse.json(comparison);
}
