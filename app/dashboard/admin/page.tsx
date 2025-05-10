// pages/dashboard/admin.tsx
"use client";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6 text-center">
        Welcome back, Admin! Here you can manage users and companies.
      </p>

      <div className="flex flex-col w-full max-w-md gap-4">
        <Link href="/dashboard/company">
          <button className="btn-primary w-full">
            Go to Company Dashboard
          </button>
        </Link>
        <Link href="/dashboard/user">
          <button className="btn-primary w-full">
            Go to User Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
