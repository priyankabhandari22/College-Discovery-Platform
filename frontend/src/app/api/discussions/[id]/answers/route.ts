import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

const answerSchema = z.object({
  content: z.string().min(1, 'Answer cannot be empty'),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const discussion = await prisma.discussion.findUnique({ where: { id } });
  if (!discussion) {
    return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
  }

  const body = await request.json();
  const parsed = answerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Answer is required' }, { status: 400 });
  }

  const answer = await prisma.answer.create({
    data: {
      content: parsed.data.content,
      userId: session.user.id,
      discussionId: id,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  // Broadcast to Socket.IO server
  fetch(`${WS_URL}/api/ws/broadcast`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'new-answer',
      data: { ...answer, discussionId: id },
    }),
  }).catch(() => {});

  return NextResponse.json(answer, { status: 201 });
}
