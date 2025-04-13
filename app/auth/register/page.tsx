"use client";

import '../../globals.css';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "USER", // ✅ pakai enum
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        role: form.role, // ✅ enum Role
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
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <p className="mb-6 text-center">
        Welcome to HealLink!<br />
        Yuk daftar dulu...
      </p>

      <form onSubmit={handleRegister} className="flex flex-col w-full max-w-xs gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Nama"
          className="input"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="input"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="text"
          placeholder="No Telepon"
          className="input"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="input"
          required
        />
        <input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
          className="input"
          required
        />

        {/* Pilihan Role */}
        <div className="mt-4">
          <label className="block mb-2 text-sm">Daftar sebagai:</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="input"
          >
            <option value="USER">User Biasa</option>
            <option value="COMPANY">Perusahaan</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Sign Up
        </button>

        <p className="text-center text-sm">
          Sudah punya akun?{" "}
          <a href="/auth/login" className="text-blue-500 underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
