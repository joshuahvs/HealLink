// app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Get project by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: params.id
      },
      include: {
        // Include createdBy user with selected fields
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        // Include donations that aren't anonymous
        donations: {
          where: {
            isAnonymous: false
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        // Include volunteers
        volunteers: {
          include: {
            user: {
              select: {
                id: true,
                name: true, 
                image: true
              }
            }
          }
        },
        // Include partnerships with companies
        partnerships: {
          include: {
            company: true
          }
        },
        // Include fund usage records
        fundUsages: true
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// Update project (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "MODERATOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: {
        id: params.id
      }
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Update project
    const updatedProject = await prisma.project.update({
      where: {
        id: params.id
      },
      data: {
        ...body,
        targetAmount: body.targetAmount ? parseFloat(body.targetAmount) : undefined,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : null,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
      }
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("[PROJECT_PATCH]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// Delete project (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "MODERATOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: {
        id: params.id
      }
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // First delete related records to avoid foreign key constraints
    // Delete fund usages
    await prisma.fundUsage.deleteMany({
      where: {
        projectId: params.id
      }
    });

    // Delete partnerships
    await prisma.companyPartnership.deleteMany({
      where: {
        projectId: params.id
      }
    });

    // Delete volunteers associated with this project
    await prisma.volunteer.deleteMany({
      where: {
        projectId: params.id
      }
    });

    // Delete donations
    await prisma.donation.deleteMany({
      where: {
        projectId: params.id
      }
    });

    // Delete project
    await prisma.project.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PROJECT_DELETE]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}