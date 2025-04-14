import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { Prisma, PaymentStatus } from '@prisma/client'; // Import PaymentStatus enum

// GET - Fetch all donations (with pagination and filtering)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build where clause with specific type
    const where: Prisma.DonationWhereInput = {};
    if (projectId) where.projectId = projectId;
    if (userId) where.userId = userId;
    if (status) where.status = status as PaymentStatus; // Use PaymentStatus enum directly

    // Get donations with pagination
    const donations = await prisma.donation.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Get total count for pagination
    const total = await prisma.donation.count({ where });

    return NextResponse.json({
      donations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}

// POST - Create a new donation with dummy payment processing
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, amount, message, isAnonymous } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid donation amount' }, { status: 400 });
    }

    // Start a transaction to ensure data consistency
    return await prisma.$transaction(async (tx) => {
      // Create payment history first (dummy payment)
      const paymentHistory = await tx.paymentHistory.create({
        data: {
          userId: session.user.id,
          amount,
          paymentMethod: 'CREDIT_CARD',
          transactionId: `TR-${Date.now()}`,
          status: 'COMPLETED',
        },
      });

      // Create the donation
      const donation = await tx.donation.create({
        data: {
          userId: session.user.id,
          projectId,
          amount,
          message,
          isAnonymous: isAnonymous || false,
          status: 'COMPLETED',
        },
      });

      // Update project's current amount if projectId is provided
      if (projectId) {
        await tx.project.update({
          where: { id: projectId },
          data: {
            currentAmount: {
              increment: amount,
            },
          },
        });
      }

      // Link the donation to the payment history
      await tx.paymentHistory.update({
        where: { id: paymentHistory.id },
        data: {
          donationId: donation.id,
        },
      });

      return NextResponse.json({ 
        success: true, 
        donation,
        paymentHistory 
      });
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 });
  }
}