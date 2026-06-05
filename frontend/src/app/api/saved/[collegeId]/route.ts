import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ collegeId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collegeId } = await params;

  await prisma.savedCollege.deleteMany({
    where: {
      userId: session.user.id,
      collegeId,
    },
  });

  return NextResponse.json({ success: true });
}
