"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto py-16 max-w-md text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
      
      <p className="mb-6 text-gray-600">
        Terima kasih atas donasi Anda. Kontribusi Anda akan membantu 
        menyediakan akses kesehatan yang lebih baik untuk masyarakat yang membutuhkan.
      </p>
      
      <div className="p-6 bg-gray-50 rounded-lg mb-8">
        <h2 className="font-medium mb-4">Apa langkah selanjutnya?</h2>
        
        <ul className="text-left space-y-2 mb-4">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Email konfirmasi telah dikirim ke alamat email Anda</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Anda dapat melihat riwayat donasi di halaman Donasi</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Tim kami akan mengirimkan laporan dampak dari donasi Anda</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col gap-3">
        <Link href="/donations">
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Lihat Riwayat Donasi
          </button>
        </Link>
        
        <Link href="/projects">
          <button className="w-full py-2 px-4 bg-transparent border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
            Kembali ke Proyek
          </button>
        </Link>
      </div>
    </div>
  );
}