"use client";

import "../../globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password tidak cocok");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      }),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const { error } = await res.json();
      alert(error || "Gagal registrasi. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 bg-gradient-hero py-8">
      <div className="mb-8">
        <Image
          src="/HealLink-white.svg"
          alt="HealLink Logo"
          width={180}
          height={50}
          className="h-12 w-auto"
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Sign Up
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Welcome to HealLink!
          <br />
          Yuk daftar dulu...
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="space-y-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Nama"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
              placeholder="No Telepon"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Daftar sebagai:
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USER">User Biasa</option>
              <option value="COMPANY">Perusahaan</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mt-4"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            Sudah punya akun?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
