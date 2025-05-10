import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();

    // Validasi input
    const allowedStatuses = ['ACTIVE', 'PAUSED', 'CANCELLED'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Pastikan subscription milik user
    const subscription = await prisma.subscription.findUnique({
      where: { id: params.id },
    });

    if (!subscription || subscription.userId !== session.user.id) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ subscription: updatedSubscription });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}
