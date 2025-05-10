import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// GET: Admin fetch all company partnerships
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "MODERATOR") {
      return NextResponse.json(
        { error: "Unauthorized - Moderator access required" },
        { status: 403 }
      );
    }

    const partnerships = await prisma.companyPartnership.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            email: true,
            logoUrl: true,
          },
        },
        project: true,
      },
      orderBy: {
        startDate: "desc",
      },
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

// PUT: Admin approve/reject/update status of a partnership
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "MODERATOR") {
      return NextResponse.json(
        { error: "Unauthorized - Moderator access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { partnershipId, status } = body;

    if (!partnershipId || !status) {
      return NextResponse.json(
        { error: "Partnership ID and status are required" },
        { status: 400 }
      );
    }

    if (!["ACTIVE", "REJECTED", "COMPLETED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const partnership = await prisma.companyPartnership.findUnique({
      where: { id: partnershipId },
    });

    if (!partnership) {
      return NextResponse.json(
        { error: "Partnership not found" },
        { status: 404 }
      );
    }

    const updatedPartnership = await prisma.companyPartnership.update({
      where: { id: partnershipId },
      data: { status },
    });

    // Only increase project amount if approved
    if (status === "ACTIVE") {
      await prisma.project.update({
        where: { id: partnership.projectId },
        data: {
          currentAmount: {
            increment: partnership.amount,
          },
        },
      });
    }

    return NextResponse.json(updatedPartnership);
  } catch (error) {
    console.error("Error updating partnership:", error);
    return NextResponse.json(
      { error: "Failed to update partnership" },
      { status: 500 }
    );
  }
}
