import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// GET - Fetch fund usage reports for a project
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const fundUsages = await prisma.fundUsage.findMany({
      where: { projectId: params.id },
      orderBy: { date: 'desc' },
    });

    // Calculate statistics
    const totalUsed = fundUsages.reduce((sum, usage) => sum + usage.amount, 0);
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      select: { currentAmount: true },
    });

    return NextResponse.json({
      fundUsages,
      statistics: {
        totalCollected: project?.currentAmount || 0,
        totalUsed,
        remaining: (project?.currentAmount || 0) - totalUsed,
      },
    });
  } catch (error) {
    console.error('Error fetching fund usage:', error);
    return NextResponse.json({ error: 'Failed to fetch fund usage reports' }, { status: 500 });
  }
}

// POST - Create a new fund usage report (admin only)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== 'MODERATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { amount, description, date, category, receiptUrl } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Verify that the project exists
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Create the fund usage report
    const fundUsage = await prisma.fundUsage.create({
      data: {
        projectId: params.id,
        amount,
        description,
        date: new Date(date),
        category,
        receiptUrl,
      },
    });

    return NextResponse.json(fundUsage);
  } catch (error) {
    console.error('Error creating fund usage report:', error);
    return NextResponse.json({ error: 'Failed to create fund usage report' }, { status: 500 });
  }
}