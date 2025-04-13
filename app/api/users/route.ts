import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import * as bcrypt from 'bcrypt';

// GET - Mengambil semua data user
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            donations: true,
            subscriptions: true,
          }
        }
      }
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST - Registrasi user baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, image, role, companyDetails } = body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
        role: role || 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    // Lalu jika role-nya COMPANY
    if (role === 'COMPANY') {
      await prisma.company.create({
        data: {
          name: companyDetails?.name || name,
          email,
          logoUrl: image,
          contactName: companyDetails?.contactName || name,
          contactPhone: companyDetails?.contactPhone || null,
          userId: user.id // <<-- tambahkan ini!
        }
      });
    }
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}