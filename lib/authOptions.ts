import { PrismaAdapter } from "@next-auth/prisma-adapter";  // Changed from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import { Role } from "@prisma/client";

// For the JWT token
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user || !credentials?.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    // Inject role into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    // Inject role into session so it's accessible on client
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};