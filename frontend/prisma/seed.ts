import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { SEED_COLLEGES } from '../src/data/seed-colleges';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed College table
  console.log(`Upserting ${SEED_COLLEGES.length} colleges...`);
  for (const c of SEED_COLLEGES) {
    await prisma.college.upsert({
      where: { id: c.id },
      create: {
        id: c.id,
        name: c.name,
        city: c.city,
        state: c.state,
        rating: c.rating,
        annualFees: c.annualFees,
        naacGrade: c.naacGrade,
        ownership: c.ownership,
        streams: c.streams,
        approvedBy: c.approvedBy,
        logo: c.logo,
        image: c.image,
        placementPct: c.placementPct,
        description: c.description ?? null,
        established: c.established ?? null,
      },
      update: {
        name: c.name,
        city: c.city,
        state: c.state,
        rating: c.rating,
        annualFees: c.annualFees,
        naacGrade: c.naacGrade,
        ownership: c.ownership,
        streams: c.streams,
        approvedBy: c.approvedBy,
        logo: c.logo,
        image: c.image,
        placementPct: c.placementPct,
        description: c.description ?? null,
        established: c.established ?? null,
      },
    });
  }
  console.log('Colleges seeded.');

  // 2. Create test users
  const passwordHash = await hash('Test1234', 12);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@test.com' },
    create: { name: 'Alice', email: 'alice@test.com', passwordHash },
    update: {},
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@test.com' },
    create: { name: 'Bob', email: 'bob@test.com', passwordHash },
    update: {},
  });

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@test.com' },
    create: { name: 'Charlie', email: 'charlie@test.com', passwordHash },
    update: {},
  });

  console.log(`Users: alice@test.com, bob@test.com, charlie@test.com (password: Test1234)`);

  // 3. Saved colleges for Alice
  const aliceSavedIds = ['clg-iitb', 'clg-coep', 'clg-vjti'];
  for (const collegeId of aliceSavedIds) {
    await prisma.savedCollege.upsert({
      where: { userId_collegeId: { userId: alice.id, collegeId } },
      create: { userId: alice.id, collegeId },
      update: {},
    });
  }
  console.log(`Alice saved ${aliceSavedIds.length} colleges.`);

  // 4. Saved comparisons for Alice
  await prisma.savedComparison.upsert({
    where: { id: 'cmp-alice-1' },
    create: {
      id: 'cmp-alice-1',
      userId: alice.id,
      label: 'IIT Bombay vs COEP',
      collegeIds: ['clg-iitb', 'clg-coep'],
    },
    update: {},
  });
  await prisma.savedComparison.upsert({
    where: { id: 'cmp-alice-2' },
    create: {
      id: 'cmp-alice-2',
      userId: alice.id,
      label: 'Top Mumbai Colleges',
      collegeIds: ['clg-iitb', 'clg-vjti', 'clg-dj'],
    },
    update: {},
  });
  console.log('Alice saved 2 comparisons.');

  // 5. Saved college for Bob
  await prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId: bob.id, collegeId: 'clg-iitb' } },
    create: { userId: bob.id, collegeId: 'clg-iitb' },
    update: {},
  });
  console.log('Bob saved 1 college.');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
