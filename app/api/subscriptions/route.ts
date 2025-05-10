import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, frequency } = await request.json();

    // Validasi frekuensi
    const allowedFrequencies = ['MONTHLY', 'ANNUALLY'];
    if (!allowedFrequencies.includes(frequency)) {
      return NextResponse.json({ error: 'Invalid frequency' }, { status: 400 });
    }
    
    // Hitung tanggal billing selanjutnya
    const nextBillingDate = new Date();
    if (frequency === 'MONTHLY') {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    } else if (frequency === 'ANNUALLY') {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        amount,
        frequency,
        nextBillingDate,
      },
    });

    return NextResponse.json({ subscription }, { status: 201 });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}
