import { writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'C:\\Users\\Priyanka\\Desktop\\EduTrack\\frontend\\public\\colleges';

const colleges = [
  { id: 'clg-iitd', name: 'IIT Delhi', initial: 'ID', color: '#2563EB' },
  { id: 'clg-nsut', name: 'NSUT Delhi', initial: 'NS', color: '#059669' },
  { id: 'clg-dtu', name: 'DTU Delhi', initial: 'DT', color: '#DC2626' },
  { id: 'clg-iisc', name: 'IISc Bangalore', initial: 'IS', color: '#7C3AED' },
  { id: 'clg-nitk', name: 'NIT Surathkal', initial: 'NK', color: '#0891B2' },
  { id: 'clg-iitm', name: 'IIT Madras', initial: 'IM', color: '#CA8A04' },
  { id: 'clg-nitt', name: 'NIT Trichy', initial: 'NT', color: '#EA580C' },
  { id: 'clg-iith', name: 'IIT Hyderabad', initial: 'IH', color: '#0D9488' },
  { id: 'clg-iiith', name: 'IIIT Hyderabad', initial: 'II', color: '#4F46E5' },
  { id: 'clg-iitkgp', name: 'IIT Kharagpur', initial: 'KG', color: '#B91C1C' },
  { id: 'clg-jadavpur', name: 'Jadavpur Univ', initial: 'JU', color: '#1D4ED8' },
  { id: 'clg-iitk', name: 'IIT Kanpur', initial: 'IK', color: '#047857' },
  { id: 'clg-iitbhu', name: 'IIT BHU', initial: 'BH', color: '#6D28D9' },
  { id: 'clg-iitgn', name: 'IIT Gandhinagar', initial: 'GN', color: '#C2410C' },
  { id: 'clg-svnit', name: 'SVNIT Surat', initial: 'SV', color: '#0369A1' },
  { id: 'clg-iitj', name: 'IIT Jodhpur', initial: 'IJ', color: '#A21CAF' },
  { id: 'clg-bitsp', name: 'BITS Pilani', initial: 'BP', color: '#BE123C' },
  { id: 'clg-nitc', name: 'NIT Calicut', initial: 'NC', color: '#15803D' },
  { id: 'clg-cet', name: 'CET Trivandrum', initial: 'CT', color: '#0F766E' },
  { id: 'clg-iiti', name: 'IIT Indore', initial: 'IIR', color: '#92400E' },
  { id: 'clg-manit', name: 'MANIT Bhopal', initial: 'MB', color: '#3730A3' },
  { id: 'clg-iitrpr', name: 'IIT Ropar', initial: 'RP', color: '#B45309' },
  { id: 'clg-thapar', name: 'Thapar Univ', initial: 'TU', color: '#1E40AF' },
  { id: 'clg-nitrrk', name: 'NIT Rourkela', initial: 'RR', color: '#9A3412' },
  { id: 'clg-iitbbs', name: 'IIT Bhubaneswar', initial: 'BB', color: '#065F46' },
  { id: 'clg-iitg', name: 'IIT Guwahati', initial: 'IG', color: '#831843' },
  { id: 'clg-nits', name: 'NIT Silchar', initial: 'NSI', color: '#1E3A5F' },
];

for (const c of colleges) {
  // Logo SVG
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${c.name}">
  <circle cx="64" cy="64" r="64" fill="${c.color}"/>
  <text x="64" y="76" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="32" font-weight="700">${c.initial}</text>
</svg>`;
  writeFileSync(join(DIR, `${c.id}-logo.svg`), logo, 'utf-8');

  // Campus SVG
  const campus = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480" role="img" aria-label="${c.name} campus">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c.color}"/><stop offset="100%" stop-color="${c.color}80"/></linearGradient></defs>
  <rect width="800" height="480" fill="url(#bg)"/>
  <ellipse cx="400" cy="430" rx="300" ry="35" fill="#000" opacity="0.12"/>
  <rect x="110" y="180" width="130" height="200" fill="#fff" opacity="0.88" rx="6"/>
  <rect x="260" y="140" width="160" height="240" fill="#fff" opacity="0.95" rx="6"/>
  <rect x="440" y="165" width="120" height="215" fill="#fff" opacity="0.85" rx="6"/>
  <rect x="580" y="210" width="90" height="170" fill="#fff" opacity="0.8" rx="6"/>
  <text x="400" y="72" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="26" font-weight="700">${c.name}</text>
</svg>`;
  writeFileSync(join(DIR, `${c.id}-campus.svg`), campus, 'utf-8');

  console.log(`Created ${c.id}-logo.svg + ${c.id}-campus.svg`);
}

console.log(`\nDone — ${colleges.length * 2} SVGs created`);
