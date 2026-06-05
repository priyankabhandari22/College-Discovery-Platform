import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const saveSchema = z.object({
  collegeId: z.string().min(1),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: true },
    orderBy: { savedAt: 'desc' },
  });

  return NextResponse.json(saved);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = saveSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const saved = await prisma.savedCollege.upsert({
    where: {
      userId_collegeId: {
        userId: session.user.id,
        collegeId: parsed.data.collegeId,
      },
    },
    create: {
      userId: session.user.id,
      collegeId: parsed.data.collegeId,
    },
    update: {},
  });

  return NextResponse.json(saved);
}
