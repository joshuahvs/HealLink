import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// GET - Mengambil semua donasi dari suatu user
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const donations = await prisma.donation.findMany({
      where: { userId: params.id },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching user donations:', error);
    return NextResponse.json({ error: 'Failed to fetch user donations' }, { status: 500 });
  }
}