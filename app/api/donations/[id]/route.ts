import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// GET - Fetch donation details by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const donationId = params.id;  // Tidak perlu await di sini
    if (!donationId) {
      return NextResponse.json({ error: 'Donation ID is required' }, { status: 400 });
    }

    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        project: true,
      },
    });

    if (!donation) {
      return NextResponse.json({ error: 'Donation not found' }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    return NextResponse.json({ error: 'Failed to fetch donation' }, { status: 500 });
  }
}



// PUT - Update donation data (only message and isAnonymous)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { message, isAnonymous } = body;
    const donationId = params.id;

    if (!donationId) {
      return NextResponse.json({ error: 'Donation ID is required' }, { status: 400 });
    }

    const donation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        message,
        isAnonymous,
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.error('Error updating donation:', error);
    return NextResponse.json({ error: 'Failed to update donation' }, { status: 500 });
  }
}
