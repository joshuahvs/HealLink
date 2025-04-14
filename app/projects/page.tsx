"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Heart,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

// Dummy data for projects
const dummyProjects = [
  {
    id: 1,
    title: "Bantuan Medis Daerah Terpencil",
    description:
      "Program bantuan medis untuk masyarakat di daerah terpencil yang sulit mengakses layanan kesehatan.",
    location: "Nusa Tenggara Timur",
    category: "Kesehatan",
    targetAmount: "Rp 50.000.000",
    raisedAmount: "Rp 35.000.000",
    progress: 70,
    volunteers: 25,
    daysLeft: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800",
  },
  {
    id: 2,
    title: "Pengobatan Gratis Lansia",
    description:
      "Program pengobatan gratis untuk lansia dari keluarga prasejahtera di daerah perkotaan.",
    location: "Jakarta Timur",
    category: "Kesehatan",
    targetAmount: "Rp 25.000.000",
    raisedAmount: "Rp 20.000.000",
    progress: 80,
    volunteers: 15,
    daysLeft: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800",
  },
  {
    id: 3,
    title: "Program Vaksinasi Anak",
    description:
      "Program vaksinasi gratis untuk anak-anak dari keluarga kurang mampu.",
    location: "Surabaya",
    category: "Kesehatan",
    targetAmount: "Rp 35.000.000",
    raisedAmount: "Rp 15.000.000",
    progress: 43,
    volunteers: 20,
    daysLeft: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800",
  },
];

// Dummy categories
const categories = [
  "Semua",
  "Kesehatan",
  "Pendidikan",
  "Kemanusiaan",
  "Bencana Alam",
  "Infrastruktur",
];

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Proyek Kesehatan</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Bergabung dalam misi kami untuk meningkatkan akses layanan kesehatan
            bagi masyarakat yang membutuhkan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari proyek kesehatan..."
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{project.raisedAmount}</span>
                    <span className="text-gray-500">
                      dari {project.targetAmount}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{project.volunteers} relawan</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{project.daysLeft} hari lagi</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/donations/add/${project.id}`)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Heart size={18} />
                    Donasi
                  </button>
                  <Link
                    href={`/projects/${project.id}`}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-1"
                  >
                    Detail
                    <ArrowRight size={16} />
                  </Link>
                </div>
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
