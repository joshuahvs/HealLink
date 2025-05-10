// app/api/projects/[id]/volunteers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Get all volunteer assignments for a project
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if project exists
    const project = await prisma.project.findUnique({
      where: {
        id: params.id
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const volunteers = await prisma.volunteerAssignment.findMany({
      where: {
        projectId: params.id
      },
      include: {
        volunteer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    return NextResponse.json(volunteers);
  } catch (error) {
    console.error("[PROJECT_VOLUNTEERS_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// Assign a volunteer to a project (admin only)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "MODERATOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: {
        id: params.id
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await req.json();
    const { volunteerId, startDate, endDate, status } = body;

    // Validation
    if (!volunteerId || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if volunteer exists
    const volunteer = await prisma.volunteer.findUnique({
      where: {
        id: volunteerId
      }
    });

    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    // Check if volunteer is already assigned to this project
    const existingAssignment = await prisma.volunteerAssignment.findFirst({
      where: {
        volunteerId,
        projectId: params.id,
        status: {
          not: "CANCELLED"
        }
      }
    });

    if (existingAssignment) {
      return NextResponse.json({ error: "Volunteer already assigned to this project" }, { status: 400 });
    }

    const assignment = await prisma.volunteerAssignment.create({
      data: {
        volunteerId,
        projectId: params.id,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status: status || "ASSIGNED"
      }
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error("[PROJECT_VOLUNTEERS_POST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
