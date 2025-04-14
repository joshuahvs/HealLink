"use client";

import Link from "next/link";
import './globals.css';
import {
  Heart,
  Users,
  MapPin,
  ArrowRight,
  Check,
  Globe,
  FileText,
} from "lucide-react";
import Navbar from "./components/Navbar";

// Dummy stats
const stats = [
  { label: "Total Donasi", value: "Rp 1.5M+" },
  { label: "Relawan Aktif", value: "500+" },
  { label: "Proyek Kesehatan", value: "50+" },
  { label: "Orang Terbantu", value: "10,000+" },
];

// Dummy featured projects
const featuredProjects = [
  {
    id: 1,
    title: "Bantuan Medis Daerah Terpencil",
    location: "Nusa Tenggara Timur",
    progress: 70,
    target: "Rp 50.000.000",
    raised: "Rp 35.000.000",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800",
  },
  {
    id: 2,
    title: "Program Vaksinasi Anak",
    location: "Jakarta Timur",
    progress: 85,
    target: "Rp 25.000.000",
    raised: "Rp 21.250.000",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800",
  },
  {
    id: 3,
    title: "Pengobatan Gratis Lansia",
    location: "Surabaya",
    progress: 60,
    target: "Rp 30.000.000",
    raised: "Rp 18.000.000",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Wujudkan Akses</span>
                  <span className="block text-blue-200">
                    Kesehatan untuk Semua
                  </span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Bergabung dalam misi kami untuk meningkatkan akses layanan
                  kesehatan bagi masyarakat yang membutuhkan melalui donasi dan
                  program relawan.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/projects"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                    >
                      Mulai Berdonasi
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/volunteers"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Jadi Relawan
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
            alt="Medical volunteers"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-lg text-center"
              >
                <div className="text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Proyek Terkini</h2>
            <p className="mt-4 text-lg text-gray-600">
              Lihat proyek kesehatan yang sedang berlangsung dan butuh dukungan
              Anda
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
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
                  <h3 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h3>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{project.raised}</span>
                      <span className="text-gray-500">
                        dari {project.target}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/projects/${project.id}`}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Heart size={18} />
                    Donasi Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              Lihat Semua Proyek
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Mengapa HealLink?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Platform donasi kesehatan yang transparan, aman, dan terpercaya
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Jangkauan Luas</h3>
              <p className="mt-2 text-gray-600">
                Menjangkau daerah-daerah yang membutuhkan layanan kesehatan di
                seluruh Indonesia
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium">
                Relawan Terverifikasi
              </h3>
              <p className="mt-2 text-gray-600">
                Didukung oleh relawan profesional kesehatan yang terverifikasi
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Transparansi</h3>
              <p className="mt-2 text-gray-600">
                Laporan penggunaan dana yang transparan dan dapat diakses publik
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Siap untuk membantu?</span>
            <span className="block text-blue-200">
              Bergabunglah dengan kami sekarang.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Mulai Berdonasi
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/volunteers"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
              >
                Jadi Relawan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
