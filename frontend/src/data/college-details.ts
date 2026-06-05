import type { College, Stream } from '@/types/college';
import { SEED_COLLEGES } from './seed-colleges';

function loc(city: string, state: string) {
  return `${city}, ${state}`;
}

export const COLLEGE_DETAILS: College[] = SEED_COLLEGES.map((s) => {
  const base: College = {
    id: s.id,
    name: s.name,
    logo: s.logo ?? `/colleges/${s.id}-logo.svg`,
    image: s.image ?? `/colleges/${s.id}-campus.svg`,
    location: loc(s.city, s.state),
    rating: s.rating,
    fees: s.annualFees,
    placementPercentage: s.placementPct ?? 0,
    description: s.description ?? '',
    accreditation: `NAAC ${s.naacGrade}`,
    established: s.established ?? 2000,
    stream: 'Engineering' as Stream,
    courses: [],
    placements: {
      avgCTC: 0,
      highestCTC: 0,
      placementPercentage: s.placementPct ?? 0,
      topRecruiters: [],
    },
    reviews: [],
    ratingBreakdown: {
      faculty: 0,
      campus: 0,
      placements: 0,
      infrastructure: 0,
      valueForMoney: 0,
    },
    cutoffs: {},
  };

  switch (s.id) {
    case 'clg-iitb':
      return {
        ...base,
        description: 'IIT Bombay is a premier engineering institute in India, known for its excellence in education and research. Established in 1958, it is a dream destination for engineering aspirants.',
        accreditation: 'Institute of Eminence',
        established: 1958,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2500000, highestCTC: 12000000, placementPercentage: 95,
          topRecruiters: ['Google', 'Microsoft', 'Uber', 'Goldman Sachs'],
        },
        reviews: [{
          studentName: 'Rahul Sharma', rating: 5,
          comment: 'Amazing culture and peer group.',
          pros: ['Brilliant Peer Group', 'Excellent Placements'],
          cons: ['Heavy Academic Load'],
        }],
        ratingBreakdown: { faculty: 4.9, campus: 4.7, placements: 5.0, infrastructure: 4.8, valueForMoney: 4.6 },
        cutoffs: { 'JEE Main': { min: 1, max: 500 }, 'MHT-CET': { min: 1, max: 100 } },
      };
    case 'clg-coep':
      return {
        ...base,
        description: 'One of the oldest engineering colleges in Asia, COEP offers a rich heritage of academic excellence combined with modern infrastructure.',
        accreditation: 'Autonomous Institution',
        established: 1854,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 120000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 120000 },
        ],
        placements: {
          avgCTC: 1000000, highestCTC: 4500000, placementPercentage: 90,
          topRecruiters: ['TCS', 'Infosys', 'Microsoft', 'Amazon'],
        },
        reviews: [{
          studentName: 'Priya Patel', rating: 4,
          comment: 'Great college with excellent faculty and campus life.',
          pros: ['Experienced Faculty', 'Good Infrastructure'],
          cons: ['Strict Attendance'],
        }],
        ratingBreakdown: { faculty: 4.4, campus: 4.3, placements: 4.6, infrastructure: 4.2, valueForMoney: 4.8 },
        cutoffs: { 'JEE Main': { min: 2000, max: 15000 }, 'MHT-CET': { min: 500, max: 2500 } },
      };
    case 'clg-mitwpu':
      return {
        ...base,
        description: 'Private university focused on holistic education and peace studies, offering modern engineering programs.',
        accreditation: 'State Private University',
        established: 1983,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 350000 },
          { name: 'B.Tech AI & Data Science', duration: '4 Years', fees: 350000 },
        ],
        placements: {
          avgCTC: 650000, highestCTC: 3000000, placementPercentage: 78,
          topRecruiters: ['Wipro', 'TCS', 'Accenture'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.0, campus: 4.5, placements: 3.8, infrastructure: 4.6, valueForMoney: 3.5 },
        cutoffs: { 'JEE Main': { min: 15000, max: 80000 }, 'MHT-CET': { min: 2500, max: 15000 } },
      };
    case 'clg-vjti':
      return {
        ...base,
        description: 'VJTI is a premier engineering institute in Mumbai with a legacy of producing top engineers since 1887.',
        accreditation: 'NAAC A++',
        established: 1887,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 95000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 95000 },
        ],
        placements: {
          avgCTC: 900000, highestCTC: 4000000, placementPercentage: 88,
          topRecruiters: ['TCS', 'L&T', 'JSW', 'Reliance'],
        },
        reviews: [{
          studentName: 'Amit Desai', rating: 4,
          comment: 'Excellent value for money. Great placements for the fees charged.',
          pros: ['Affordable Fees', 'Good Placement Record'],
          cons: ['Old Infrastructure'],
        }],
        ratingBreakdown: { faculty: 4.5, campus: 3.8, placements: 4.4, infrastructure: 3.6, valueForMoney: 4.9 },
        cutoffs: { 'JEE Main': { min: 5000, max: 30000 }, 'MHT-CET': { min: 500, max: 3000 } },
      };
    case 'clg-pict':
      return {
        ...base,
        description: 'PICT is one of the top private engineering colleges in Pune, known for its strong CS and IT programs.',
        accreditation: 'NAAC A+',
        established: 1983,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 185000 },
          { name: 'B.E. Electronics & Telecom', duration: '4 Years', fees: 185000 },
        ],
        placements: {
          avgCTC: 750000, highestCTC: 3500000, placementPercentage: 85,
          topRecruiters: ['Infosys', 'Microsoft', 'Amazon', 'Persistent'],
        },
        reviews: [{
          studentName: 'Sneha Kulkarni', rating: 4,
          comment: 'Good placements and industry connections. Campus could be bigger.',
          pros: ['Strong Alumni Network', 'Placement Support'],
          cons: ['Small Campus'],
        }],
        ratingBreakdown: { faculty: 4.3, campus: 3.9, placements: 4.5, infrastructure: 4.0, valueForMoney: 4.2 },
        cutoffs: { 'JEE Main': { min: 15000, max: 60000 }, 'MHT-CET': { min: 1000, max: 5000 } },
      };
    case 'clg-wcet':
      return {
        ...base,
        description: 'Walchand College of Engineering is one of the oldest engineering colleges in Maharashtra, located in Sangli.',
        accreditation: 'NAAC A',
        established: 1947,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 145000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 145000 },
        ],
        placements: {
          avgCTC: 550000, highestCTC: 2200000, placementPercentage: 82,
          topRecruiters: ['TCS', 'Infosys', 'Bajaj Auto'],
        },
        reviews: [{
          studentName: 'Vikas Patil', rating: 4,
          comment: 'Good college for the region. Peaceful campus and supportive faculty.',
          pros: ['Peaceful Campus', 'Good Faculty'],
          cons: ['Limited Recruiters'],
        }],
        ratingBreakdown: { faculty: 4.2, campus: 4.0, placements: 3.8, infrastructure: 3.9, valueForMoney: 4.5 },
        cutoffs: { 'MHT-CET': { min: 5000, max: 20000 } },
      };
    case 'clg-vit':
      return {
        ...base,
        description: 'Vishwakarma Institute of Technology is a well-regarded private engineering college in Pune.',
        accreditation: 'NAAC A+',
        established: 1983,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 165000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 165000 },
        ],
        placements: {
          avgCTC: 650000, highestCTC: 2800000, placementPercentage: 80,
          topRecruiters: ['TCS', 'Infosys', 'Cognizant', 'Tech Mahindra'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.1, campus: 4.0, placements: 4.2, infrastructure: 4.1, valueForMoney: 4.3 },
        cutoffs: { 'MHT-CET': { min: 2000, max: 10000 } },
      };
    case 'clg-sppu-eng':
      return {
        ...base,
        description: 'The engineering department of Savitribai Phule Pune University, one of India\'s premier public universities.',
        accreditation: 'NAAC A++',
        established: 1949,
        courses: [
          { name: 'B.E. Civil Engineering', duration: '4 Years', fees: 85000 },
          { name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 85000 },
        ],
        placements: {
          avgCTC: 500000, highestCTC: 1800000, placementPercentage: 75,
          topRecruiters: ['L&T', 'TCS', 'Infosys'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.3, campus: 3.8, placements: 3.5, infrastructure: 3.6, valueForMoney: 4.7 },
        cutoffs: { 'MHT-CET': { min: 5000, max: 25000 } },
      };
    case 'clg-dj':
      return {
        ...base,
        description: 'DJ Sanghvi College of Engineering is a top private engineering college in Mumbai, known for its strong academic culture.',
        accreditation: 'NAAC A+',
        established: 1996,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 220000 },
          { name: 'B.Tech Electronics & Telecom', duration: '4 Years', fees: 220000 },
        ],
        placements: {
          avgCTC: 700000, highestCTC: 3000000, placementPercentage: 84,
          topRecruiters: ['TCS', 'Accenture', 'L&T', 'Morgan Stanley'],
        },
        reviews: [{
          studentName: 'Karan Mehta', rating: 4,
          comment: 'Great college in Mumbai with good industry connections.',
          pros: ['Location', 'Placement Support'],
          cons: ['High Fees'],
        }],
        ratingBreakdown: { faculty: 4.2, campus: 4.1, placements: 4.3, infrastructure: 4.2, valueForMoney: 3.8 },
        cutoffs: { 'JEE Main': { min: 30000, max: 80000 }, 'MHT-CET': { min: 1000, max: 6000 } },
      };
    case 'clg-kjsce':
      return {
        ...base,
        description: 'K J Somaiya College of Engineering is a reputed private engineering college in Mumbai with strong industry partnerships.',
        accreditation: 'NAAC A+',
        established: 1983,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 198000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 198000 },
        ],
        placements: {
          avgCTC: 680000, highestCTC: 3200000, placementPercentage: 83,
          topRecruiters: ['TCS', 'Amazon', 'Capgemini', 'JPMorgan'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.2, campus: 4.3, placements: 4.2, infrastructure: 4.4, valueForMoney: 4.0 },
        cutoffs: { 'MHT-CET': { min: 2000, max: 8000 } },
      };
    case 'clg-pccoe':
      return {
        ...base,
        description: 'Pimpri Chinchwad College of Engineering is a well-known private engineering college in Pune with good industry exposure.',
        accreditation: 'NAAC A',
        established: 1999,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 155000 },
          { name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 155000 },
        ],
        placements: {
          avgCTC: 580000, highestCTC: 2500000, placementPercentage: 79,
          topRecruiters: ['TCS', 'Infosys', 'Cummins', 'Bajaj Auto'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.0, campus: 3.8, placements: 4.0, infrastructure: 3.9, valueForMoney: 4.2 },
        cutoffs: { 'MHT-CET': { min: 3000, max: 15000 } },
      };
    case 'clg-sinhgad':
      return {
        ...base,
        description: 'Sinhgad College of Engineering is one of the largest private engineering colleges in Pune with multiple campuses.',
        accreditation: 'NAAC B++',
        established: 1996,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 125000 },
          { name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 125000 },
        ],
        placements: {
          avgCTC: 450000, highestCTC: 1500000, placementPercentage: 72,
          topRecruiters: ['TCS', 'Infosys', 'Wipro'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 3.8, campus: 3.5, placements: 3.6, infrastructure: 3.7, valueForMoney: 4.3 },
        cutoffs: { 'MHT-CET': { min: 10000, max: 40000 } },
      };
    case 'clg-rait':
      return {
        ...base,
        description: 'Ramrao Adik Institute of Technology is a private engineering college in Navi Mumbai with focus on technology education.',
        accreditation: 'NAAC A',
        established: 1983,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 175000 },
          { name: 'B.E. Electronics & Telecom', duration: '4 Years', fees: 175000 },
        ],
        placements: {
          avgCTC: 520000, highestCTC: 2000000, placementPercentage: 76,
          topRecruiters: ['TCS', 'Infosys', 'Persistent', 'Cognizant'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.0, campus: 3.9, placements: 3.9, infrastructure: 4.0, valueForMoney: 4.1 },
        cutoffs: { 'MHT-CET': { min: 5000, max: 20000 } },
      };
    case 'clg-som':
      return {
        ...base,
        description: 'Symbiosis Institute of Technology is a deemed university offering modern engineering programs with global exposure.',
        accreditation: 'NAAC A++',
        established: 2007,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 310000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 310000 },
        ],
        placements: {
          avgCTC: 800000, highestCTC: 3500000, placementPercentage: 86,
          topRecruiters: ['Microsoft', 'Dell', 'Amazon', 'Infosys'],
        },
        reviews: [{
          studentName: 'Ananya Gupta', rating: 4,
          comment: 'Modern infrastructure and good industry linkages.',
          pros: ['Modern Labs', 'Industry Exposure'],
          cons: ['Expensive'],
        }],
        ratingBreakdown: { faculty: 4.2, campus: 4.6, placements: 4.3, infrastructure: 4.5, valueForMoney: 3.6 },
        cutoffs: { 'JEE Main': { min: 10000, max: 50000 } },
      };
    case 'clg-agnel':
      return {
        ...base,
        description: 'Fr. Conceicao Rodrigues College of Engineering (Agnel) is a renowned aided engineering college in Mumbai.',
        accreditation: 'NAAC A',
        established: 1984,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 140000 },
          { name: 'B.E. Electronics & Telecom', duration: '4 Years', fees: 140000 },
        ],
        placements: {
          avgCTC: 560000, highestCTC: 2400000, placementPercentage: 77,
          topRecruiters: ['TCS', 'L&T', 'Reliance', 'Capgemini'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.1, campus: 3.7, placements: 3.9, infrastructure: 3.8, valueForMoney: 4.4 },
        cutoffs: { 'MHT-CET': { min: 4000, max: 18000 } },
      };
    case 'clg-iitd':
      return {
        ...base,
        description: 'IIT Delhi is one of the premier engineering institutes in India, known for its cutting-edge research and excellent placement record.',
        accreditation: 'Institute of Eminence',
        established: 1961,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2600000, highestCTC: 15000000, placementPercentage: 95,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
        },
        reviews: [{
          studentName: 'Arjun Mehta', rating: 5,
          comment: 'World-class education with unparalleled peer group and placement opportunities.',
          pros: ['Top-notch Faculty', 'Excellent Placements'],
          cons: ['High Academic Pressure'],
        }],
        ratingBreakdown: { faculty: 4.9, campus: 4.6, placements: 5.0, infrastructure: 4.8, valueForMoney: 4.5 },
        cutoffs: { 'JEE Advanced': { min: 1, max: 500 } },
      };
    case 'clg-nsut':
      return {
        ...base,
        description: 'NSUT is a premier government engineering college in Delhi, formerly known as NSIT, with strong industry ties.',
        accreditation: 'NAAC A+',
        established: 1983,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 95000 },
          { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 95000 },
        ],
        placements: {
          avgCTC: 1200000, highestCTC: 5000000, placementPercentage: 85,
          topRecruiters: ['Microsoft', 'Amazon', 'TCS', 'Wipro'],
        },
        reviews: [{
          studentName: 'Neha Agarwal', rating: 4,
          comment: 'Great college with affordable fees and good placement opportunities.',
          pros: ['Affordable Fees', 'Good Location'],
          cons: ['Campus Could Be Bigger'],
        }],
        ratingBreakdown: { faculty: 4.3, campus: 4.0, placements: 4.4, infrastructure: 4.1, valueForMoney: 4.8 },
        cutoffs: { 'JEE Main': { min: 2000, max: 15000 } },
      };
    case 'clg-dtu':
      return {
        ...base,
        description: 'DTU is one of India\'s oldest engineering colleges, known for its strong academic programs and excellent placements.',
        accreditation: 'NAAC A+',
        established: 1941,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 110000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 110000 },
        ],
        placements: {
          avgCTC: 1500000, highestCTC: 6000000, placementPercentage: 88,
          topRecruiters: ['Google', 'Amazon', 'Microsoft', 'TCS'],
        },
        reviews: [{
          studentName: 'Rohit Singh', rating: 4,
          comment: 'Excellent engineering college with great campus and placement record.',
          pros: ['Strong Alumni Network', 'Industry Connections'],
          cons: ['Crowded Campus'],
        }],
        ratingBreakdown: { faculty: 4.4, campus: 4.2, placements: 4.5, infrastructure: 4.3, valueForMoney: 4.7 },
        cutoffs: { 'JEE Main': { min: 1500, max: 12000 } },
      };
    case 'clg-iisc':
      return {
        ...base,
        description: 'IISc Bangalore is India\'s premier scientific research institute, offering world-class education and research opportunities.',
        accreditation: 'Institute of Eminence',
        established: 1909,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 50000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 50000 },
        ],
        placements: {
          avgCTC: 2800000, highestCTC: 8000000, placementPercentage: 98,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Intel'],
        },
        reviews: [{
          studentName: 'Aditya Rao', rating: 5,
          comment: 'Unmatched research environment and brilliant faculty. A dream institute for engineers.',
          pros: ['Research Focus', 'Brilliant Peers'],
          cons: ['Heavy Workload'],
        }],
        ratingBreakdown: { faculty: 5.0, campus: 4.8, placements: 4.9, infrastructure: 4.9, valueForMoney: 5.0 },
        cutoffs: { 'JEE Advanced': { min: 1, max: 300 }, 'GATE': { min: 1, max: 200 } },
      };
    case 'clg-nitk':
      return {
        ...base,
        description: 'NIT Surathkal is a premier engineering institute on the coast of Karnataka, known for its scenic campus and strong academics.',
        accreditation: 'Institute of National Importance',
        established: 1960,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 150000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 150000 },
        ],
        placements: {
          avgCTC: 1600000, highestCTC: 5500000, placementPercentage: 90,
          topRecruiters: ['Microsoft', 'Amazon', 'Goldman Sachs', 'TCS'],
        },
        reviews: [{
          studentName: 'Sachin Shetty', rating: 5,
          comment: 'Beautiful campus by the beach with excellent academics and placements.',
          pros: ['Scenic Campus', 'Great Placements'],
          cons: ['Remote Location'],
        }],
        ratingBreakdown: { faculty: 4.5, campus: 4.9, placements: 4.6, infrastructure: 4.7, valueForMoney: 4.6 },
        cutoffs: { 'JEE Main': { min: 1000, max: 10000 } },
      };
    case 'clg-iitm':
      return {
        ...base,
        description: 'IIT Madras is a top-ranked engineering institute with a beautiful campus and exceptional research output.',
        accreditation: 'Institute of Eminence',
        established: 1959,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2400000, highestCTC: 14000000, placementPercentage: 96,
          topRecruiters: ['Google', 'Microsoft', 'Apple', 'Amazon'],
        },
        reviews: [{
          studentName: 'Karthik Iyer', rating: 5,
          comment: 'Incredible campus life with world-class academics and placements.',
          pros: ['Beautiful Campus', 'Excellent Placements'],
          cons: ['Hot Weather'],
        }],
        ratingBreakdown: { faculty: 4.9, campus: 5.0, placements: 4.9, infrastructure: 4.9, valueForMoney: 4.5 },
        cutoffs: { 'JEE Advanced': { min: 1, max: 600 } },
      };
    case 'clg-nitt':
      return {
        ...base,
        description: 'NIT Trichy is consistently ranked among the top NITs in India, with excellent placements and campus life.',
        accreditation: 'Institute of National Importance',
        established: 1964,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 140000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 140000 },
        ],
        placements: {
          avgCTC: 1800000, highestCTC: 6000000, placementPercentage: 92,
          topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Infosys'],
        },
        reviews: [{
          studentName: 'Divya Krishnan', rating: 5,
          comment: 'Top-notch education with amazing campus culture and placement support.',
          pros: ['Strong Academics', 'Great Placements'],
          cons: ['Strict Rules'],
        }],
        ratingBreakdown: { faculty: 4.7, campus: 4.5, placements: 4.8, infrastructure: 4.6, valueForMoney: 4.7 },
        cutoffs: { 'JEE Main': { min: 800, max: 8000 } },
      };
    case 'clg-iith':
      return {
        ...base,
        description: 'IIT Hyderabad is a young and dynamic IIT with a focus on innovation and interdisciplinary research.',
        accreditation: 'Institute of National Importance',
        established: 2008,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2200000, highestCTC: 8000000, placementPercentage: 92,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Uber'],
        },
        reviews: [{
          studentName: 'Priya Reddy', rating: 5,
          comment: 'Excellent new-age IIT with innovative curriculum and great placements.',
          pros: ['Modern Curriculum', 'Good Placements'],
          cons: ['Ongoing Construction'],
        }],
        ratingBreakdown: { faculty: 4.7, campus: 4.5, placements: 4.8, infrastructure: 4.4, valueForMoney: 4.4 },
        cutoffs: { 'JEE Advanced': { min: 100, max: 2000 } },
      };
    case 'clg-iiith':
      return {
        ...base,
        description: 'IIIT Hyderabad is a premier research institute specializing in computer science and information technology.',
        accreditation: 'Institute of National Importance',
        established: 1998,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 280000 },
          { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 280000 },
        ],
        placements: {
          avgCTC: 2500000, highestCTC: 7000000, placementPercentage: 95,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Facebook'],
        },
        reviews: [{
          studentName: 'Ravi Kiran', rating: 5,
          comment: 'World-class CS research institute with brilliant peers and amazing placements.',
          pros: ['CS Focus', 'Research Opportunities'],
          cons: ['High Fees'],
        }],
        ratingBreakdown: { faculty: 4.8, campus: 4.3, placements: 4.9, infrastructure: 4.5, valueForMoney: 4.2 },
        cutoffs: { 'JEE Main': { min: 800, max: 5000 } },
      };
    case 'clg-iitkgp':
      return {
        ...base,
        description: 'IIT Kharagpur is the first IIT established in India, with the largest campus and a rich legacy of academic excellence.',
        accreditation: 'Institute of Eminence',
        established: 1951,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2300000, highestCTC: 12000000, placementPercentage: 94,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
        },
        reviews: [{
          studentName: 'Sudipta Bose', rating: 5,
          comment: 'The largest IIT campus with incredible diversity and placement opportunities.',
          pros: ['Huge Campus', 'Diverse Culture'],
          cons: ['Located in Small Town'],
        }],
        ratingBreakdown: { faculty: 4.8, campus: 4.9, placements: 4.8, infrastructure: 4.7, valueForMoney: 4.5 },
        cutoffs: { 'JEE Advanced': { min: 1, max: 1500 } },
      };
    case 'clg-jadavpur':
      return {
        ...base,
        description: 'Jadavpur University is a premier public university in Kolkata, renowned for its engineering and humanities programs.',
        accreditation: 'NAAC A++',
        established: 1955,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 25000 },
          { name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 25000 },
        ],
        placements: {
          avgCTC: 1100000, highestCTC: 4500000, placementPercentage: 85,
          topRecruiters: ['TCS', 'Microsoft', 'Amazon', 'Cognizant'],
        },
        reviews: [{
          studentName: 'Ananya Sen', rating: 4,
          comment: 'Excellent public university with affordable education and good placements.',
          pros: ['Low Fees', 'Good Academics'],
          cons: ['Old Infrastructure'],
        }],
        ratingBreakdown: { faculty: 4.5, campus: 4.0, placements: 4.3, infrastructure: 3.8, valueForMoney: 5.0 },
        cutoffs: { 'JEE Main': { min: 5000, max: 30000 } },
      };
    case 'clg-iitk':
      return {
        ...base,
        description: 'IIT Kanpur is renowned for its strong undergraduate education and pioneering research in engineering and science.',
        accreditation: 'Institute of Eminence',
        established: 1959,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2500000, highestCTC: 13000000, placementPercentage: 93,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Uber'],
        },
        reviews: [{
          studentName: 'Vikram Malhotra', rating: 5,
          comment: 'Brilliant campus with a strong focus on fundamental sciences and engineering.',
          pros: ['Research Culture', 'Strong Academics'],
          cons: ['Extreme Weather'],
        }],
        ratingBreakdown: { faculty: 4.9, campus: 4.5, placements: 4.8, infrastructure: 4.6, valueForMoney: 4.5 },
        cutoffs: { 'JEE Advanced': { min: 1, max: 1200 } },
      };
    case 'clg-iitbhu':
      return {
        ...base,
        description: 'IIT BHU combines the heritage of Banaras Hindu University with the modernity of an IIT education.',
        accreditation: 'Institute of National Importance',
        established: 1919,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 200000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 200000 },
        ],
        placements: {
          avgCTC: 1800000, highestCTC: 7000000, placementPercentage: 88,
          topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Goldman Sachs'],
        },
        reviews: [{
          studentName: 'Ayush Tiwari', rating: 4,
          comment: 'Rich heritage combined with modern IIT education. Great campus culture.',
          pros: ['Historical Legacy', 'Good Placements'],
          cons: ['Old Hostels'],
        }],
        ratingBreakdown: { faculty: 4.5, campus: 4.2, placements: 4.5, infrastructure: 4.0, valueForMoney: 4.6 },
        cutoffs: { 'JEE Advanced': { min: 500, max: 4000 } },
      };
    case 'clg-iitgn':
      return {
        ...base,
        description: 'IIT Gandhinagar is known for its innovative curriculum, vibrant campus life, and focus on liberal arts in engineering.',
        accreditation: 'Institute of National Importance',
        established: 2008,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2000000, highestCTC: 7500000, placementPercentage: 90,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe'],
        },
        reviews: [{
          studentName: 'Disha Patel', rating: 5,
          comment: 'Innovative curriculum with focus on holistic development. Great faculty.',
          pros: ['Innovative Courses', 'Beautiful Campus'],
          cons: ['Still Growing'],
        }],
        ratingBreakdown: { faculty: 4.6, campus: 4.8, placements: 4.6, infrastructure: 4.7, valueForMoney: 4.4 },
        cutoffs: { 'JEE Advanced': { min: 500, max: 3000 } },
      };
    case 'clg-svnit':
      return {
        ...base,
        description: 'SVNIT Surat is a leading NIT with a strong focus on research and industry partnerships in Gujarat.',
        accreditation: 'Institute of National Importance',
        established: 1961,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 145000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 145000 },
        ],
        placements: {
          avgCTC: 1200000, highestCTC: 4500000, placementPercentage: 85,
          topRecruiters: ['Amazon', 'TCS', 'L&T', 'Infosys'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.3, campus: 4.1, placements: 4.3, infrastructure: 4.2, valueForMoney: 4.5 },
        cutoffs: { 'JEE Main': { min: 3000, max: 20000 } },
      };
    case 'clg-iitj':
      return {
        ...base,
        description: 'IIT Jodhpur is a rapidly growing IIT with a focus on technology-driven solutions for societal challenges.',
        accreditation: 'Institute of National Importance',
        established: 2008,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 1800000, highestCTC: 6500000, placementPercentage: 86,
          topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Adobe'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.3, campus: 4.5, placements: 4.4, infrastructure: 4.6, valueForMoney: 4.3 },
        cutoffs: { 'JEE Advanced': { min: 1000, max: 5000 } },
      };
    case 'clg-bitsp':
      return {
        ...base,
        description: 'BITS Pilani is a premier deemed university known for its rigorous academics, strong alumni network, and excellent placements.',
        accreditation: 'Deemed University',
        established: 1964,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 420000 },
          { name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 420000 },
        ],
        placements: {
          avgCTC: 2200000, highestCTC: 8000000, placementPercentage: 93,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
        },
        reviews: [{
          studentName: 'Rahul Jain', rating: 5,
          comment: 'Amazing institute with a strong alumni network and excellent placement record.',
          pros: ['Strong Alumni', 'Great Placements'],
          cons: ['High Fees', 'Remote Location'],
        }],
        ratingBreakdown: { faculty: 4.6, campus: 4.3, placements: 4.8, infrastructure: 4.4, valueForMoney: 3.8 },
        cutoffs: { 'JEE Main': { min: 2000, max: 15000 } },
      };
    case 'clg-nitc':
      return {
        ...base,
        description: 'NIT Calicut is a premier engineering institute in Kerala with a sprawling campus and excellent academic record.',
        accreditation: 'Institute of National Importance',
        established: 1961,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 140000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 140000 },
        ],
        placements: {
          avgCTC: 1300000, highestCTC: 5000000, placementPercentage: 88,
          topRecruiters: ['Amazon', 'TCS', 'Infosys', 'Microsoft'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.4, campus: 4.6, placements: 4.4, infrastructure: 4.5, valueForMoney: 4.5 },
        cutoffs: { 'JEE Main': { min: 3000, max: 18000 } },
      };
    case 'clg-cet':
      return {
        ...base,
        description: 'CET Trivandrum is the oldest engineering college in Kerala, known for its academic excellence and affordable fees.',
        accreditation: 'NAAC A+',
        established: 1939,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 55000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 55000 },
        ],
        placements: {
          avgCTC: 800000, highestCTC: 3500000, placementPercentage: 82,
          topRecruiters: ['TCS', 'Infosys', 'L&T', 'UST Global'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.2, campus: 4.0, placements: 4.1, infrastructure: 3.9, valueForMoney: 4.8 },
        cutoffs: { 'JEE Main': { min: 15000, max: 60000 } },
      };
    case 'clg-iiti':
      return {
        ...base,
        description: 'IIT Indore is a fast-growing IIT with modern infrastructure and a focus on interdisciplinary research.',
        accreditation: 'Institute of National Importance',
        established: 2009,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 1800000, highestCTC: 6500000, placementPercentage: 88,
          topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Adobe'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.5, campus: 4.4, placements: 4.5, infrastructure: 4.5, valueForMoney: 4.3 },
        cutoffs: { 'JEE Advanced': { min: 1500, max: 5000 } },
      };
    case 'clg-manit':
      return {
        ...base,
        description: 'MANIT Bhopal is a leading NIT in central India with strong industry connections and a lush campus.',
        accreditation: 'Institute of National Importance',
        established: 1960,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 140000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 140000 },
        ],
        placements: {
          avgCTC: 1100000, highestCTC: 4000000, placementPercentage: 83,
          topRecruiters: ['Amazon', 'TCS', 'Infosys', 'Cognizant'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.2, campus: 4.1, placements: 4.2, infrastructure: 4.0, valueForMoney: 4.5 },
        cutoffs: { 'JEE Main': { min: 5000, max: 25000 } },
      };
    case 'clg-iitrpr':
      return {
        ...base,
        description: 'IIT Ropar is a newer IIT with a strong emphasis on innovation and cutting-edge research facilities.',
        accreditation: 'Institute of National Importance',
        established: 2008,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 1600000, highestCTC: 5500000, placementPercentage: 85,
          topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Adobe'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.3, campus: 4.3, placements: 4.3, infrastructure: 4.4, valueForMoney: 4.2 },
        cutoffs: { 'JEE Advanced': { min: 2000, max: 5000 } },
      };
    case 'clg-thapar':
      return {
        ...base,
        description: 'Thapar University is a prestigious deemed university in Punjab known for its strong engineering and management programs.',
        accreditation: 'NAAC A+',
        established: 1956,
        courses: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 380000 },
          { name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 380000 },
        ],
        placements: {
          avgCTC: 1000000, highestCTC: 4500000, placementPercentage: 87,
          topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Infosys'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.3, campus: 4.2, placements: 4.3, infrastructure: 4.3, valueForMoney: 3.8 },
        cutoffs: { 'JEE Main': { min: 8000, max: 40000 } },
      };
    case 'clg-nitrrk':
      return {
        ...base,
        description: 'NIT Rourkela is one of the top NITs known for its sprawling campus and strong placement record.',
        accreditation: 'Institute of National Importance',
        established: 1961,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 145000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 145000 },
        ],
        placements: {
          avgCTC: 1300000, highestCTC: 4800000, placementPercentage: 86,
          topRecruiters: ['Amazon', 'TCS', 'L&T', 'Infosys'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.3, campus: 4.4, placements: 4.4, infrastructure: 4.3, valueForMoney: 4.4 },
        cutoffs: { 'JEE Main': { min: 5000, max: 22000 } },
      };
    case 'clg-iitbbs':
      return {
        ...base,
        description: 'IIT Bhubaneswar is a young IIT growing rapidly with modern infrastructure and a focus on technology-driven research.',
        accreditation: 'Institute of National Importance',
        established: 2008,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 1400000, highestCTC: 5000000, placementPercentage: 82,
          topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Adobe'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.2, campus: 4.2, placements: 4.2, infrastructure: 4.3, valueForMoney: 4.2 },
        cutoffs: { 'JEE Advanced': { min: 2500, max: 5000 } },
      };
    case 'clg-iitg':
      return {
        ...base,
        description: 'IIT Guwahati is the premier engineering institute in northeast India with a stunning campus on the banks of the Brahmaputra.',
        accreditation: 'Institute of Eminence',
        established: 1994,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 210000 },
        ],
        placements: {
          avgCTC: 2200000, highestCTC: 9000000, placementPercentage: 93,
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
        },
        reviews: [{
          studentName: 'Pallab Das', rating: 5,
          comment: 'Stunning campus on the Brahmaputra with world-class academics and placements.',
          pros: ['Beautiful Campus', 'Great Academics'],
          cons: ['Humid Climate'],
        }],
        ratingBreakdown: { faculty: 4.8, campus: 5.0, placements: 4.7, infrastructure: 4.8, valueForMoney: 4.5 },
        cutoffs: { 'JEE Advanced': { min: 100, max: 2000 } },
      };
    case 'clg-nits':
      return {
        ...base,
        description: 'NIT Silchar is a leading technical institute in northeast India with a scenic campus and a growing academic reputation.',
        accreditation: 'Institute of National Importance',
        established: 1967,
        courses: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 135000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 135000 },
        ],
        placements: {
          avgCTC: 700000, highestCTC: 2800000, placementPercentage: 78,
          topRecruiters: ['TCS', 'Infosys', 'Amazon', 'Wipro'],
        },
        reviews: [],
        ratingBreakdown: { faculty: 4.0, campus: 4.0, placements: 3.8, infrastructure: 3.9, valueForMoney: 4.3 },
        cutoffs: { 'JEE Main': { min: 15000, max: 50000 } },
      };
    default:
      return base;
  }
});

export function getCollegeDetailById(id: string): College | undefined {
  return COLLEGE_DETAILS.find((c) => c.id === id);
}

export function getCollegeDetailsByIds(ids: string[]): College[] {
  return COLLEGE_DETAILS.filter((c) => ids.includes(c.id));
}

export function predictCollegesByRank(exam: string, rank: number): College[] {
  return COLLEGE_DETAILS.filter((c) => {
    const cutoff = c.cutoffs?.[exam];
    if (!cutoff) return false;
    return rank >= cutoff.min && rank <= cutoff.max * 1.1;
  });
}
