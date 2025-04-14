import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Prisma, ProjectStatus } from "@prisma/client"; // Import Prisma and ProjectStatus enum

// Get all projects
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const location = searchParams.get("location");

    // Build filters with specific type
    const filters: Prisma.ProjectWhereInput = {};
    if (status) {
      filters.status = status as ProjectStatus; // Cast to ProjectStatus enum
    }
    if (location) {
      filters.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    const projects = await prisma.project.findMany({
      where: filters,
      include: {
        volunteers: {
          include: {
            user: true,
          },
        },
        partnerships: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// Create a new project (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "MODERATOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      description,
      targetAmount,
      startDate,
      endDate,
      status,
      location,
      latitude,
      longitude,
      imageUrl,
    } = body;

    // Validation
    if (!name || !description || !targetAmount || !startDate || !status || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        targetAmount: parseFloat(targetAmount),
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status: status as ProjectStatus, // Cast to ProjectStatus enum
        location,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        imageUrl,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_POST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}