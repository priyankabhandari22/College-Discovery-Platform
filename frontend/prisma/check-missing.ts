import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cols = await prisma.college.findMany({ select: { id: true, name: true, logo: true, image: true } });
  const missing = cols.filter(c => !c.logo || !c.image);
  for (const c of missing) {
    console.log(`${c.id}:${c.name}`);
  }
  console.log(`\nTotal missing: ${missing.length}`);
}

main().finally(() => prisma.$disconnect());
