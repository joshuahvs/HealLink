// app/api/volunteers/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const volunteer = await prisma.volunteer.findUnique({
      where: { id: id },
      include: { user: true, project: true },
    });

    if (!volunteer) {
      return NextResponse.json({ message: 'Volunteer not found' }, { status: 404 });
    }

    return NextResponse.json(volunteer, { status: 200 });
  } catch (error) {
    console.error('Error fetching volunteer by id:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}