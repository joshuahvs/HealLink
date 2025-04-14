"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Filter, Search, ArrowUp, ArrowDown } from "lucide-react";
import Navbar from "../components/Navbar";

// Dummy data for donations
const dummyDonations = [
  {
    id: 1,
    projectName: "Bantuan Medis Daerah Terpencil",
    amount: "Rp 1.000.000",
    date: "12 Apr 2025",
    status: "Berhasil",
    category: "Kesehatan",
    impact: "100 orang terbantu",
  },
  {
    id: 2,
    projectName: "Pengobatan Gratis Lansia",
    amount: "Rp 500.000",
    date: "10 Apr 2025",
    status: "Berhasil",
    category: "Kesehatan",
    impact: "50 lansia terbantu",
  },
  {
    id: 3,
    projectName: "Program Vaksinasi Anak",
    amount: "Rp 750.000",
    date: "5 Apr 2025",
    status: "Berhasil",
    category: "Kesehatan",
    impact: "75 anak tervaksinasi",
  },
];

export default function DonationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Donasi</h1>
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Heart size={20} />
            Donasi Sekarang
          </Link>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari donasi..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter size={20} className="text-gray-500" />
                <span>Filter</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <ArrowUp size={16} />
                Terbaru
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <ArrowDown size={16} />
                Nominal
              </button>
            </div>
          </div>
        </div>

        {/* Donations List */}
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {dummyDonations.map((donation) => (
            <div
              key={donation.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {donation.projectName}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>{donation.date}</span>
                    <span>•</span>
                    <span>{donation.category}</span>
                    <span>•</span>
                    <span className="text-green-600">{donation.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {donation.impact}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">
                    {donation.amount}
                  </span>
                  <button
                    onClick={() => router.push(`/payment/history`)}
                    className="block mt-2 text-blue-600 text-sm hover:underline"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <nav className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-500">
              Previous
            </button>
            <button className="px-4 py-2 border rounded-lg bg-blue-50 text-blue-600 font-medium">
              1
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-500">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
