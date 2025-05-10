// /app/subscription/success/page.tsx
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="container mx-auto py-16 max-w-md text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
      
      <p className="mb-6 text-gray-600">
        Terima kasih telah berlangganan HealLink. Kontribusi Anda akan membantu 
        menyediakan akses kesehatan yang lebih baik untuk masyarakat di daerah terpencil.
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
            <span>Laporan dampak pertama akan dikirim pada bulan depan</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Anda dapat mengakses dashboard HealLink untuk memantau kontribusi Anda</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col gap-3">
        <Link href="/dashboard">
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Lihat Dashboard
          </button>
        </Link>
        
        <Link href="/">
          <button className="w-full py-2 px-4 bg-transparent border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}
