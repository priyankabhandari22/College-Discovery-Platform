import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

const createSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

export async function GET() {
  const discussions = await prisma.discussion.findMany({
    include: {
      user: { select: { id: true, name: true, image: true } },
      _count: { select: { answers: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(discussions);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const discussion = await prisma.discussion.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      userId: session.user.id,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
      _count: { select: { answers: true } },
    },
  });

  // Broadcast to Socket.IO server (fire-and-forget)
  fetch(`${WS_URL}/api/ws/broadcast`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'new-discussion', data: discussion }),
  }).catch(() => {});

  return NextResponse.json(discussion, { status: 201 });
}
