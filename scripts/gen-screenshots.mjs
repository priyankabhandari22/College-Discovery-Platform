import fs from 'fs';
import path from 'path';
const dir = 'C:\\Users\\Priyanka\\Desktop\\EduTrack\\screenshots';

const pages = [
  {
    file: 'home.svg', title: 'Home / College Discovery',
    desc: 'Search bar, filter sidebar, college card grid with pagination',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'searchbar', y: 80 },
      { type: 'filters', y: 180, w: 220 },
      { type: 'cardgrid', y: 180, x: 250, cards: 6 },
      { type: 'pagination', y: 430 },
    ]
  },
  {
    file: 'detail.svg', title: 'College Detail Page',
    desc: 'Campus image, overview, courses table, placement charts, radar chart, reviews',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'campusbanner', y: 80 },
      { type: 'overview', y: 300 },
      { type: 'charts', y: 420 },
    ]
  },
  {
    file: 'compare.svg', title: 'Compare Colleges',
    desc: 'Side-by-side table with winner highlighting for fees, placements, ratings, courses',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'comparetable', y: 80 },
      { type: 'comparebar', y: 450 },
    ]
  },
  {
    file: 'predictor.svg', title: 'Admission Predictor',
    desc: 'Exam & rank input form with predicted college list results',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'predictorform', y: 80 },
      { type: 'predictorresults', y: 260 },
    ]
  },
  {
    file: 'login.svg', title: 'Login Page',
    desc: 'Email/password sign-in form with Google OAuth option and register link',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'loginform', y: 100 },
    ]
  },
  {
    file: 'register.svg', title: 'Register Page',
    desc: 'Registration form with name, email, password fields',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'registerform', y: 100 },
    ]
  },
  {
    file: 'saved.svg', title: 'Saved Colleges',
    desc: 'Bookmarked college list with cards showing fees, placement %, links to detail',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'savedgrid', y: 80, cards: 4 },
    ]
  },
  {
    file: 'counseling.svg', title: 'Counseling Help',
    desc: 'Contact form for personalized counseling requests',
    elts: [
      { type: 'navbar', y: 0 },
      { type: 'counselingform', y: 80 },
    ]
  },
];

for (const page of pages) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520" role="img" aria-label="${page.title} screenshot mockup"><defs>
  <linearGradient id="header" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#2563eb"/></linearGradient>
  <linearGradient id="card" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f8fafc"/></linearGradient>
  <filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.08" flood-color="#000"/></filter>
</defs>
<rect width="800" height="520" fill="#f1f5f9"/>
<rect width="800" height="64" fill="url(#header)"/>
<text x="24" y="40" fill="#fff" font-family="system-ui,sans-serif" font-size="18" font-weight="700">EduTrack</text>
<rect x="700" y="20" width="72" height="28" rx="14" fill="#fff" opacity="0.85"/>
<text x="736" y="39" text-anchor="middle" fill="#1e3a5f" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Sign In</text>`;

  if (page.file === 'home.svg') {
    svg += `
<rect x="24" y="84" width="752" height="44" rx="22" fill="#fff" filter="url(#shadow)"/>
<text x="52" y="111" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="13">Search colleges by name, city, or stream...</text>
<rect x="24" y="148" width="200" height="350" rx="12" fill="#fff" filter="url(#shadow)"/>
<text x="36" y="172" fill="#334155" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Filters</text>
${['Location', 'Fees Range', 'NAAC Grade', 'Ownership', 'Stream'].map((f, i) => `<text x="36" y="${196 + i * 30}" fill="#64748b" font-family="system-ui,sans-serif" font-size="11">${f}</text>
<rect x="170" y="${190 + i * 30}" width="42" height="8" rx="4" fill="#2563eb"/>`).join('')}
<rect x="244" y="148" width="532" height="160" rx="12" fill="#fff" filter="url(#shadow)"/>
<rect x="260" y="164" width="36" height="36" rx="18" fill="#2563eb"/><text x="278" y="187" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="14" font-weight="700">I</text>
<text x="306" y="180" fill="#1e293b" font-family="system-ui,sans-serif" font-size="12" font-weight="600">IIT Bombay</text>
<text x="306" y="196" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">Mumbai, Maharashtra</text>
<text x="260" y="226" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">₹2,10,000/yr</text>
<text x="390" y="226" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">|</text>
<text x="402" y="226" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">95% placement</text>
<rect x="260" y="240" width="36" height="20" rx="4" fill="#dbeafe"/><text x="278" y="254" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="9" font-weight="600">A++</text>
<rect x="302" y="240" width="50" height="20" rx="4" fill="#dcfce7"/><text x="327" y="254" text-anchor="middle" fill="#16a34a" font-family="system-ui,sans-serif" font-size="9" font-weight="600">Govt.</text>
<rect x="688" y="164" width="72" height="28" rx="14" fill="#2563eb"/><text x="724" y="182" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Compare</text>
<rect x="688" y="200" width="72" height="28" rx="14" fill="#fee2e2"/><text x="724" y="218" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="10" font-weight="600">♥ Save</text>
${[1,2].map(i => `
<rect x="${244 + i * 272}" y="322" width="260" height="150" rx="12" fill="#fff" filter="url(#shadow)"/>
<rect x="${260 + i * 272}" y="338" width="36" height="36" rx="18" fill="#${i === 0 ? '059669' : '7c3aed'}"/><text x="${278 + i * 272}" y="361" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="14" font-weight="700">${['C','I'][i]}</text>
<text x="${306 + i * 272}" y="354" fill="#1e293b" font-family="system-ui,sans-serif" font-size="12" font-weight="600">${['COEP Pune','IIT Delhi'][i]}</text>
<text x="${306 + i * 272}" y="370" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">${['Pune, MH','Delhi, Delhi'][i]}</text>
<text x="${260 + i * 272}" y="400" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">₹${['1,20,000','2,10,000'][i]}/yr</text>
<text x="${260 + i * 272}" y="416" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">⭐ 4.${[6,9][i]}</text>`).join('')}
<rect x="320" y="490" width="24" height="24" rx="6" fill="#2563eb"/><text x="332" y="507" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="12" font-weight="700">1</text>
<rect x="352" y="490" width="24" height="24" rx="6" fill="#e2e8f0"/><text x="364" y="507" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="12" font-weight="600">2</text>
<rect x="384" y="490" width="24" height="24" rx="6" fill="#e2e8f0"/><text x="396" y="507" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="12" font-weight="600">3</text>`;
  }

  if (page.file === 'detail.svg') {
    svg += `
<rect x="0" y="64" width="800" height="200" fill="#2563eb" opacity="0.15"/>
<rect x="24" y="284" width="752" height="220" rx="12" fill="#fff" filter="url(#shadow)"/>
<text x="40" y="308" fill="#1e293b" font-family="system-ui,sans-serif" font-size="16" font-weight="700">Indian Institute of Technology Bombay</text>
<text x="40" y="330" fill="#64748b" font-family="system-ui,sans-serif" font-size="12">Mumbai, Maharashtra</text>
<rect x="40" y="346" width="48" height="22" rx="4" fill="#dbeafe"/><text x="64" y="361" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="9" font-weight="600">A++</text>
<rect x="96" y="346" width="60" height="22" rx="4" fill="#dcfce7"/><text x="126" y="361" text-anchor="middle" fill="#16a34a" font-family="system-ui,sans-serif" font-size="9" font-weight="600">Govt.</text>
<text x="40" y="392" fill="#475569" font-family="system-ui,sans-serif" font-size="11">IIT Bombay is one of India's premier engineering institutes...</text>
<rect x="560" y="284" width="216" height="120" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
<text x="668" y="310" text-anchor="middle" fill="#334155" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Rating Breakdown</text>
<circle cx="668" cy="350" r="28" fill="#2563eb" opacity="0.1"/><text x="668" y="356" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="18" font-weight="700">4.9</text>
<text x="40" y="430" fill="#1e293b" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Placement Highlights</text>
<rect x="40" y="442" width="160" height="44" rx="8" fill="#f1f5f9"/><text x="120" y="460" text-anchor="middle" fill="#334155" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Avg Package</text><text x="120" y="476" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="13" font-weight="700">₹32 LPA</text>
<rect x="216" y="442" width="160" height="44" rx="8" fill="#f1f5f9"/><text x="296" y="460" text-anchor="middle" fill="#334155" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Highest</text><text x="296" y="476" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="13" font-weight="700">₹67 LPA</text>`;
  }

  if (page.file === 'compare.svg') {
    svg += `
<text x="400" y="96" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="20" font-weight="700">Compare Colleges</text>
<rect x="24" y="120" width="752" height="320" rx="12" fill="#fff" filter="url(#shadow)"/>
<rect x="24" y="120" width="376" height="44" rx="12" fill="#eef2ff"/><text x="212" y="147" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="13" font-weight="700">IIT Bombay</text>
<rect x="400" y="120" width="376" height="44" rx="12" fill="#fef2f2"/><text x="588" y="147" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="13" font-weight="700">IIT Delhi</text>
${['Rating','Annual Fees','Placement %','NAAC Grade','Courses'].map((h, i) => {
  const y = 172 + i * 52;
  const val = [['4.9 ✓','4.9 ✗'],['₹2.1L','₹2.1L'],['95% ✓','95% ✗'],['A++ ✓','A++ ✗'],['CS, Mech...','CS, Mech...']][i];
  return `<text x="40" y="${y + 10}" fill="#64748b" font-family="system-ui,sans-serif" font-size="11" font-weight="500">${h}</text>
<rect x="120" y="${y}" width="260" height="36" rx="6" fill="#f0fdf4"/><text x="250" y="${y + 24}" text-anchor="middle" fill="#16a34a" font-family="system-ui,sans-serif" font-size="12" font-weight="600">${val[0]}</text>
<rect x="400" y="${y}" width="360" height="36" rx="6" fill="#fef2f2"/><text x="580" y="${y + 24}" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="12" font-weight="600">${val[1]}</text>`;
}).join('')}
<rect x="0" y="470" width="800" height="50" fill="#fff" stroke="#e2e8f0" stroke-width="1"/>
<rect x="24" y="480" width="200" height="32" rx="16" fill="#e2e8f0"/>
<text x="48" y="500" fill="#64748b" font-family="system-ui,sans-serif" font-size="11">📚 IIT Bombay</text>
<rect x="236" y="480" width="200" height="32" rx="16" fill="#e2e8f0"/>
<text x="260" y="500" fill="#64748b" font-family="system-ui,sans-serif" font-size="11">📚 IIT Delhi</text>`;
  }

  if (page.file === 'predictor.svg') {
    svg += `
<text x="400" y="96" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="20" font-weight="700">Admission Predictor</text>
<rect x="200" y="120" width="400" height="120" rx="12" fill="#fff" filter="url(#shadow)"/>
<text x="220" y="148" fill="#334155" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Select Exam</text>
<rect x="220" y="158" width="360" height="36" rx="8" fill="#f1f5f9"/><text x="400" y="181" text-anchor="middle" fill="#334155" font-family="system-ui,sans-serif" font-size="11">JEE Main ▼</text>
<text x="220" y="210" fill="#334155" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Enter Rank</text>
<rect x="220" y="220" width="200" height="36" rx="8" fill="#f1f5f9"/><text x="320" y="243" text-anchor="middle" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">e.g. 2500</text>
<text x="400" y="262" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">Please sign in to see predictions</text>
<rect x="300" y="280" width="200" height="36" rx="18" fill="#94a3b8"/><text x="400" y="303" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Predict</text>`;
  }

  if (page.file === 'login.svg') {
    svg += `
<rect x="220" y="100" width="360" height="380" rx="16" fill="#fff" filter="url(#shadow)"/>
<rect x="360" y="120" width="80" height="80" rx="20" fill="#2563eb" opacity="0.1"/>
<text x="400" y="162" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="28" font-weight="700">E</text>
<text x="400" y="220" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="20" font-weight="700">Welcome Back</text>
<text x="400" y="244" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="12">Sign in to your account</text>
<text x="240" y="276" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Email</text>
<rect x="240" y="284" width="320" height="40" rx="8" fill="#f1f5f9"/><text x="256" y="309" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">you@example.com</text>
<text x="240" y="346" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Password</text>
<rect x="240" y="354" width="320" height="40" rx="8" fill="#f1f5f9"/><text x="256" y="379" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">••••••••</text>
<rect x="240" y="410" width="320" height="42" rx="21" fill="#2563eb"/><text x="400" y="435" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Sign In</text>
<text x="400" y="465" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="11">Don't have an account? <tspan fill="#2563eb" font-weight="600">Register</tspan></text>`;
  }

  if (page.file === 'register.svg') {
    svg += `
<rect x="220" y="100" width="360" height="400" rx="16" fill="#fff" filter="url(#shadow)"/>
<text x="400" y="150" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="20" font-weight="700">Create Account</text>
<text x="400" y="174" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="12">Join EduTrack to save and compare colleges</text>
<text x="240" y="206" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Full Name</text>
<rect x="240" y="214" width="320" height="40" rx="8" fill="#f1f5f9"/><text x="256" y="239" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">John Doe</text>
<text x="240" y="276" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Email</text>
<rect x="240" y="284" width="320" height="40" rx="8" fill="#f1f5f9"/><text x="256" y="309" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">john@example.com</text>
<text x="240" y="346" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Password</text>
<rect x="240" y="354" width="320" height="40" rx="8" fill="#f1f5f9"/><text x="256" y="379" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">At least 8 characters</text>
<rect x="240" y="414" width="320" height="42" rx="21" fill="#2563eb"/><text x="400" y="439" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Register</text>
<text x="400" y="478" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="11">Already have an account? <tspan fill="#2563eb" font-weight="600">Sign In</tspan></text>`;
  }

  if (page.file === 'saved.svg') {
    svg += `
<rect x="360" y="84" width="80" height="80" rx="20" fill="#fee2e2"/><text x="400" y="126" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="28">♥</text>
<text x="400" y="190" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="20" font-weight="700">Saved Colleges</text>
${[0,1,2,3].map(i => {
  const names = ['IIT Bombay','COEP Pune','IIT Delhi','VJTI Mumbai'];
  const locs = ['Mumbai, MH','Pune, MH','Delhi, Delhi','Mumbai, MH'];
  const fees = ['₹2,10,000','₹1,20,000','₹2,10,000','₹95,000'];
  const pct = ['95%','88%','95%','90%'];
  const x = 24 + (i % 2) * 390;
  const y = 216 + Math.floor(i / 2) * 140;
  return `
<rect x="${x}" y="${y}" width="370" height="120" rx="12" fill="#fff" filter="url(#shadow)"/>
<text x="${x + 16}" y="${y + 24}" fill="#1e293b" font-family="system-ui,sans-serif" font-size="13" font-weight="600">${names[i]}</text>
<text x="${x + 16}" y="${y + 44}" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">${locs[i]}</text>
<text x="${x + 16}" y="${y + 72}" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="500">${fees[i]}/yr</text>
<text x="${x + 120}" y="${y + 72}" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">|</text>
<text x="${x + 132}" y="${y + 72}" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="500">${pct[i]} placement</text>`;
}).join('')}`;
  }

  if (page.file === 'counseling.svg') {
    svg += `
<text x="400" y="100" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="20" font-weight="700">Counseling Help</text>
<text x="400" y="124" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="12">Get personalized guidance for your college admission journey</text>
<rect x="180" y="148" width="440" height="340" rx="16" fill="#fff" filter="url(#shadow)"/>
<text x="200" y="182" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Full Name</text>
<rect x="200" y="190" width="400" height="40" rx="8" fill="#f1f5f9"/><text x="216" y="215" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">Your name</text>
<text x="200" y="252" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Email</text>
<rect x="200" y="260" width="400" height="40" rx="8" fill="#f1f5f9"/><text x="216" y="285" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">your@email.com</text>
<text x="200" y="322" fill="#334155" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Message</text>
<rect x="200" y="330" width="400" height="80" rx="8" fill="#f1f5f9"/><text x="216" y="356" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">Tell us about your preferences...</text>
<rect x="200" y="430" width="400" height="42" rx="21" fill="#2563eb"/><text x="400" y="455" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Send Message</text>`;
  }

  svg += `\n</svg>`;
  fs.writeFileSync(path.join(dir, page.file), svg, 'utf-8');
  console.log(`Created ${page.file}`);
}
console.log('\nAll screenshots generated!');
