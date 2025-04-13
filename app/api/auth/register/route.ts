import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    const roleUpper = role?.toUpperCase();

    if (!email || !password || !name || !roleUpper) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validasi role apakah sesuai enum Prisma
    if (!Object.values(Role).includes(roleUpper as Role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: roleUpper as Role,
      },
    });

    return NextResponse.json({ user }, { status: 201 });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
