// pages/api/companies/partnerships.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// POST: Buat partnership baru
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Only companies can create partnerships" },
        { status: 403 }
      );
    }

    const company = await prisma.company.findUnique({
      where: { userId: user.id },
    });

    if (!company) {
      return NextResponse.json(
        {
          error:
            "Company profile not found. Please complete your company profile first.",
        },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      projectId,
      amount,
      startDate,
      endDate = null,
      brandRepresented,
      industryCategory,
      objective,
    } = body;

    if (!projectId || !amount || !startDate || !brandRepresented || !objective) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (project.status !== "PLANNED" && project.status !== "ONGOING") {
      return NextResponse.json(
        { error: "Cannot partner with completed projects" },
        { status: 400 }
      );
    }

    const partnership = await prisma.companyPartnership.create({
      data: {
        companyId: company.id,
        projectId,
        amount: typeof amount === "string" ? parseFloat(amount) : amount,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status: "ONREVIEW",
        brandRepresented,
        industryCategory,
        objective,
      },
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

// GET: Ambil semua partnership milik perusahaan yang sedang login
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Only companies can view their partnerships" },
        { status: 403 }
      );
    }

    const company = await prisma.company.findUnique({
      where: { userId: user.id },
    });

    if (!company) {
      return NextResponse.json(
        {
          error:
            "Company profile not found. Please complete your company profile first.",
        },
        { status: 404 }
      );
    }

    const partnerships = await prisma.companyPartnership.findMany({
      where: { companyId: company.id },
      include: {
        company: true,
        project: true,
      },
      orderBy: { startDate: "desc" },
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
