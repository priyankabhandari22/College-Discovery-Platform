import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const discussion = await prisma.discussion.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true } },
      answers: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!discussion) {
    return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
  }

  return NextResponse.json(discussion);
}
