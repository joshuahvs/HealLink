import { prisma } from "@/lib/prisma";  // Changed db to prisma
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";  // Updated authOptions import path

// GET: Fetch all partnerships for the logged in company
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Check if user is a company
    const user = await prisma.user.findUnique({  // Changed db to prisma
      where: { id: userId }
    });
    
    if (!user || user.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Only companies can view partnerships" },
        { status: 403 }
      );
    }
    
    // Fetch partnerships for the company
    const partnerships = await prisma.companyPartnership.findMany({  // Changed db to prisma
      where: { companyId: userId },
      include: {
        project: true
      }
    });
    
    return NextResponse.json(partnerships);
  } catch (error) {
    console.error("Error fetching partnerships:", error);
    return NextResponse.json(
      { error: "Failed to fetch partnerships" },
      { status: 500 }
    );
  }
}

// POST: Create a new partnership request
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Check if user is a company
    const user = await prisma.user.findUnique({  // Changed db to prisma
      where: { id: userId }
    });
    
    if (!user || user.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Only companies can create partnerships" },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    const { projectId, amount, startDate, endDate = null } = body;
    
    // Basic validation
    if (!projectId || !amount || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if project exists
    const project = await prisma.project.findUnique({  // Changed db to prisma
      where: { id: projectId }
    });
    
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Check if project is eligible for partnership (PLANNED or ONGOING)
    if (project.status !== "PLANNED" && project.status !== "ONGOING") {
      return NextResponse.json(
        { error: "Cannot partner with completed projects" },
        { status: 400 }
      );
    }
    
    // Create new partnership
    const partnership = await prisma.companyPartnership.create({  // Changed db to prisma
      data: {
        companyId: userId,
        projectId,
        amount,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status: "ACTIVE"
      }
    });
    
    return NextResponse.json(partnership, { status: 201 });
  } catch (error) {
    console.error("Error creating partnership:", error);
    return NextResponse.json(
      { error: "Failed to create partnership" },
      { status: 500 }
    );
  }
}
