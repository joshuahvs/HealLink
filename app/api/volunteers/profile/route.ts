// app/api/volunteers/profile/route.ts
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET() {
  // Get the session
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Find the volunteer profile associated with the user
    const volunteer = await prisma.volunteer.findUnique({
      where: { userId: session.user.id }, // Use userId instead of email
      include: { user: true },
    });

    if (!volunteer) {
      return NextResponse.json({ message: 'Volunteer profile not found' }, { status: 404 });
    }

    return NextResponse.json(volunteer, { status: 200 });
  } catch (error) {
    console.error('Error fetching volunteer profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Get the session
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Parse the request body
    const data = await request.json();

    // Update the volunteer profile
    const volunteer = await prisma.volunteer.update({
      where: { userId: session.user.id }, // Use userId instead of email
      data: {
        specialization: data.specialization,
        experience: data.experience,
        availability: data.availability,
        location: data.location,
        contactPhone: data.contactPhone,
        medicalLicense: data.medicalLicense,
        bio: data.bio,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
      },
      include: { user: true },
    });

    return NextResponse.json(volunteer, { status: 200 });
  } catch (error) {
    console.error('Error updating volunteer profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}