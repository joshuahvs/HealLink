"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";

// Dummy data for volunteer opportunities
const dummyOpportunities = [
  {
    id: 1,
    title: "Bantuan Medis Daerah Terpencil",
    description:
      "Dibutuhkan relawan tenaga medis untuk program bantuan kesehatan di daerah terpencil.",
    location: "Nusa Tenggara Timur",
    category: "Tenaga Medis",
    requiredVolunteers: 10,
    currentVolunteers: 5,
    duration: "3 bulan",
    startDate: "1 Mei 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800",
    skills: ["Dokter", "Perawat", "Bidan"],
  },
  {
    id: 2,
    title: "Program Vaksinasi Anak",
    description:
      "Mencari relawan untuk membantu program vaksinasi anak-anak di daerah urban.",
    location: "Jakarta Timur",
    category: "Kesehatan",
    requiredVolunteers: 15,
    currentVolunteers: 8,
    duration: "1 bulan",
    startDate: "15 Mei 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800",
    skills: ["Perawat", "Administrasi", "Koordinator"],
  },
  {
    id: 3,
    title: "Pengobatan Gratis Lansia",
    description:
      "Program pengobatan gratis untuk lansia membutuhkan relawan medis dan non-medis.",
    location: "Surabaya",
    category: "Kesehatan",
    requiredVolunteers: 20,
    currentVolunteers: 12,
    duration: "2 bulan",
    startDate: "1 Juni 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800",
    skills: ["Dokter", "Perawat", "Koordinator"],
  },
];

// Dummy categories
const categories = [
  "Semua",
  "Tenaga Medis",
  "Non-Medis",
  "Administrasi",
  "Koordinator",
  "Logistik",
];

export default function VolunteersPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Relawan Kesehatan</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Bergabunglah menjadi relawan dan bantu kami memberikan pelayanan
            kesehatan yang lebih baik untuk masyarakat.
          </p>
          <div className="mt-8">
            <Link
              href="/volunteers/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Daftar Sebagai Relawan
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari kesempatan relawan..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <span>Filter</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Terapkan
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
                  ${
                    index === 0
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={opportunity.imageUrl}
                  alt={opportunity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span>{opportunity.location}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {opportunity.description}
                </p>

                {/* Required Skills */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {opportunity.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>
                      {opportunity.currentVolunteers} dari{" "}
                      {opportunity.requiredVolunteers} relawan
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Mulai {opportunity.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Durasi: {opportunity.duration}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() =>
                    router.push(
                      `/volunteers/register?opportunity=${opportunity.id}`
                    )
                  }
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  Daftar Sekarang
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
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
