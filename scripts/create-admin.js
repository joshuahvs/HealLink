import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'regina.meilani@ui.ac.id';
  const password = 'your-secure-password'; // Ganti dengan password yang kuat
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'MODERATOR', // Sesuaikan dengan role yang ada
        name: 'adminHealink',
        password: hashedPassword,
      },
      create: {
        email,
        name: 'adminHealink',
        password: hashedPassword,
        role: 'MODERATOR', // Sesuaikan dengan role yang ada
      },
    });
    console.log('Admin created:', admin);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
