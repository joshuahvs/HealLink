"use client";

import '../../globals.css';
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSend = (e: any) => {
    e.preventDefault();
    alert("Link reset password akan dikirim ke email " + email);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <div className="mb-4">
        <img src="/lock-icon.png" alt="lock" className="w-28 h-28 mx-auto" />
      </div>
      <p className="mb-6 text-center max-w-xs">
        Masukkan alamat email kamu yang tertaut dengan akun HealLink, dan kami akan mengirimkan link untuk reset password kamu ;)
      </p>
      <form onSubmit={handleSend} className="flex flex-col w-full max-w-xs gap-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
        <button type="submit" className="btn-primary">Send</button>
      </form>
    </div>
  );
}
