import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(request: Request) {
  try {
    // Get the session using getServerSession
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { amount, paymentMethod, subscriptionId } = await request.json();
    
    // Generate a random transaction ID
    const transactionId = `tx_${Math.random().toString(36).substring(2, 15)}`;
    
    // Create payment record
    const payment = await prisma.paymentHistory.create({
      data: {
        userId: session.user.id,
        amount,
        paymentMethod,
        transactionId,
        status: 'COMPLETED',
      },
    });
    
    // If this is for a subscription, we would update the subscription's next billing date here
    if (subscriptionId) {
      const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
      });
      
      if (subscription) {
        const nextBillingDate = new Date();
        
        if (subscription.frequency === 'MONTHLY') {
          nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
        } else if (subscription.frequency === 'ANNUALLY') {
          nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
        }
        
        await prisma.subscription.update({
          where: { id: subscriptionId },
          data: { nextBillingDate },
        });
      }
    }
    
    return NextResponse.json({ payment, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get the session using getServerSession
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payments = await prisma.paymentHistory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return NextResponse.json({ error: 'Failed to fetch payment history' }, { status: 500 });
  }
}
