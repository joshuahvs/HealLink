import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


// GET: Fetch all companies from Company model
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "MODERATOR") {
      return NextResponse.json(
        { error: "Unauthorized - Moderator access required" },
        { status: 403 }
      );
    }

    const companies = await prisma.company.findMany({
      include: {
        user: true,
        partnerships: {
          include: {
            project: true,
          },
        },
      },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

// POST: Create a new company (called when company signs up or profile is created)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Pastikan yang mendaftarkan adalah user dengan role 'COMPANY'
    if (!session || session.user.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Unauthorized - Company access required" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const { name, email, logoUrl, contactName, contactPhone, userId } = body;

    const newCompany = await prisma.company.create({
      data: {
        name,
        email,
        logoUrl,
        contactName,
        contactPhone,
        userId, // Harus user yang sudah ada
      },
    });

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}

