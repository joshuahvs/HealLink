"use client";

import "../../globals.css";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      // Fetch session data after login
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;

      if (role === "MODERATOR") {
        window.location.href = "/dashboard/admin";
      } else if (role === "USER") {
        window.location.href = "/dashboard/user";
      } else if (role === "COMPANY") {
        window.location.href = "/dashboard/company";
      } else {
        alert("Unknown role");
      }
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <p className="mb-6 text-center">
        Welcome to HealLink!
        <br />
        Silahkan log in untuk melanjutkan :)
      </p>

      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-xs gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        <div className="text-right text-sm mb-2">
          <Link href="/auth/forgot-password" className="text-blue-500 underline">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="btn-primary">
          Sign In
        </button>

        <div className="text-center text-sm">Or</div>

        <button onClick={() => signIn("google")} type="button" className="btn-google">
          Sign in with Google
        </button>

        <p className="text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
