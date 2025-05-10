import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      specialization,
      experience,
      availability,
      location,
      contactPhone,
      medicalLicense,
      bio,
      latitude,
      longitude,
    } = await request.json();

    if (!specialization || !experience || !availability || !location) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check if the user is already a volunteer
    const existingVolunteer = await prisma.volunteer.findFirst({
      where: { user: { email: session.user.email } },
    });

    if (existingVolunteer) {
      return NextResponse.json(
        { message: 'You are already registered as a volunteer' },
        { status: 400 }
      );
    }

    // Create a new volunteer
    const volunteer = await prisma.volunteer.create({
      data: {
        user: { connect: { email: session.user.email } },
        specialization,
        experience,
        availability,
        location,
        contactPhone,
        medicalLicense,
        bio,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        status: 'ACTIVE',
      },
      include: {
        user: { select: { name: true } },
      },
    });

    return NextResponse.json(volunteer, { status: 201 });
  } catch (error) {
    console.error('Error with volunteer registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'MODERATOR') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const volunteers = await prisma.volunteer.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}