import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch volunteers with location data
    const volunteers = await prisma.volunteer.findMany({
      where: {
        status: 'ACTIVE',
        latitude: { not: null },
        longitude: { not: null },
      },
      select: {
        id: true,
        specialization: true,
        location: true,
        latitude: true,
        longitude: true,
        contactPhone: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    console.error('Error fetching volunteers for map:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}