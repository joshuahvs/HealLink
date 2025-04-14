'use client';

import './globals.css'; 
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Heart, PieChart, Users, MapPin } from 'lucide-react';
// import Header from '../app/components/Header';
import Footer from '../app/components/Footer';
import Navbar from './components/Navbar';

export default function HomePage() {
  const [isAuthenticated] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [stats] = useState({
    patients: 2345,
    volunteers: 187,
    locations: 32,
    donations: 'Rp 780jt+',
  });

  const toggleFeature = (feature: number | null) => {
    setActiveFeature(activeFeature === feature ? null : feature);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-section">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20">
        <div className="container flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bersama Wujudkan Kesehatan untuk Semua
            </h1>
            <p className="text-xl mb-8">
              HealLink menghadirkan klinik keliling berbasis crowdfunding untuk memberikan layanan kesehatan gratis ke
              daerah terpencil Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">
                  Mulai Berdonasi
                </button>
              </Link>
              <Link href="/projects">
                <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-700">
                  Lihat Proyek
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/api/placeholder/500/300"
                alt="Klinik Keliling HealLink"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-3xl font-bold">{stats.patients}</h3>
            <p>Pasien Terbantu</p>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-3xl font-bold">{stats.volunteers}</h3>
            <p>Relawan Aktif</p>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-3xl font-bold">{stats.locations}</h3>
            <p>Lokasi Terlayani</p>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-3xl font-bold">{stats.donations}</h3>
            <p>Total Donasi</p>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Fitur Utama HealLink</h2>
          <p className="text-xl text-gray-600">
            Beragam cara untuk berkontribusi dan melihat dampak nyata
          </p>
        </div>
        <div className="space-y-6">
          {/* Feature 1: Donasi */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(1)}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Heart className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Sistem Donasi & Crowdfunding</h3>
              </div>
              <ChevronDown
                className={`text-gray-500 transition-transform ${activeFeature === 1 ? 'rotate-180' : ''}`}
                size={24}
              />
            </div>
            {activeFeature === 1 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Fitur untuk Donatur</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Pilihan donasi sekali atau berlangganan bulanan</li>
                      <li>Transparansi penggunaan dana dengan laporan terperinci</li>
                      <li>Notifikasi & pengingat tentang donasi dan update proyek</li>
                      <li>Sertifikat donasi digital untuk setiap kontribusi</li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/api/placeholder/300/200" alt="Donasi System" className="rounded-lg" width={300} height={200} />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/donation">
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Mulai Berdonasi
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature 2: Impact Dashboard */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(2)}
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <PieChart className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Dashboard Tracking Dampak Sosial</h3>
              </div>
              <ChevronDown
                className={`text-gray-500 transition-transform ${activeFeature === 2 ? 'rotate-180' : ''}`}
                size={24}
              />
            </div>
            {activeFeature === 2 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Visualisasi Dampak</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Tracking donasi dan visualisasi penggunaan dana</li>
                      <li>Laporan dampak sosial dengan data statistik</li>
                      <li>Peta interaktif lokasi daerah yang terlayani</li>
                      <li>Cerita kesuksesan dari masyarakat penerima bantuan</li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/api/placeholder/300/200" alt="Impact Dashboard" className="rounded-lg" width={300} height={200} />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/impact">
                    <button className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Lihat Dampak
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature 3: Volunteer */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(3)}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Users className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Manajemen Relawan</h3>
              </div>
              <ChevronDown
                className={`text-gray-500 transition-transform ${activeFeature === 3 ? 'rotate-180' : ''}`}
                size={24}
              />
            </div>
            {activeFeature === 3 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Untuk Relawan</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Pendaftaran dan manajemen profil relawan</li>
                      <li>Jadwal dan lokasi klinik keliling</li>
                      <li>Pemetaan kebutuhan relawan berdasarkan daerah</li>
                      <li>Sertifikat dan penghargaan untuk kontribusi relawan</li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/api/placeholder/300/200" alt="Volunteer Management" className="rounded-lg" width={300} height={200} />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/volunteer">
                    <button className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                      Jadi Relawan
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature 4: Partnership */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(4)}
            >
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <MapPin className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Kemitraan CSR & Perusahaan</h3>
              </div>
              <ChevronDown
                className={`text-gray-500 transition-transform ${activeFeature === 4 ? 'rotate-180' : ''}`}
                size={24}
              />
            </div>
            {activeFeature === 4 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Untuk Perusahaan</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Program kemitraan khusus untuk pendanaan klinik keliling</li>
                      <li>Laporan transparansi penggunaan dana CSR</li>
                      <li>Dashboard khusus untuk melihat dampak kontribusi</li>
                      <li>Publikasi kontribusi perusahaan di website dan laporan tahunan</li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/api/placeholder/300/200" alt="CSR Partnership" className="rounded-lg" width={300} height={200} />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/partner">
                    <button className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                      Jadi Mitra
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Jadilah Bagian dari Perubahan</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Setiap donasi, relawan, atau kemitraan Anda membantu kami membawa layanan kesehatan ke pelosok Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">
                Daftar Sekarang
              </button>
            </Link>
            <Link href="/about">
              <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-700">
                Pelajari Lebih Lanjut
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}