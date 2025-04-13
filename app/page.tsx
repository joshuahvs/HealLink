"use client";

import './globals.css'; 
import { useState, useEffect, SetStateAction } from "react";
import Link from "next/link";
import { ChevronDown, Users, Heart, MapPin, PieChart, MessageCircle } from "lucide-react";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [stats, setStats] = useState({
    patients: 2345,
    volunteers: 187,
    locations: 32,
    donations: "Rp 780jt+"
  });

  const toggleFeature = (feature: number | SetStateAction<null>) => {
    if (activeFeature === feature) {
      setActiveFeature(null);
    } else {
      setActiveFeature(feature);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">HealLink</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-blue-600">Tentang Kami</Link>
            <Link href="/projects" className="text-gray-600 hover:text-blue-600">Proyek</Link>
            <Link href="/impact" className="text-gray-600 hover:text-blue-600">Dampak</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">Kontak</Link>
            {!isAuthenticated ? (
              <>
                <Link href="/auth/login">
                  <button className="px-4 py-2 text-blue-600 hover:text-blue-800">Login</button>
                </Link>
                <Link href="/auth/register">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Daftar</button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Dashboard</button>
              </Link>
            )}
          </div>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bersama Wujudkan<br />Kesehatan untuk Semua</h1>
            <p className="text-xl mb-8">
              HealLink adalah platform yang menghubungkan donatur, relawan medis, dan masyarakat untuk memastikan layanan kesehatan berkualitas dapat diakses oleh seluruh masyarakat Indonesia, termasuk di daerah terpencil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">Mulai Berdonasi</button>
              </Link>
              <Link href="/projects">
                <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-700">Lihat Proyek</button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src="/api/placeholder/500/300" alt="Klinik Keliling HealLink" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-blue-700 p-4 rounded-lg">
              <h3 className="text-3xl font-bold">{stats.patients}</h3>
              <p>Pasien Terbantu</p>
            </div>
            <div className="bg-blue-700 p-4 rounded-lg">
              <h3 className="text-3xl font-bold">{stats.volunteers}</h3>
              <p>Relawan Aktif</p>
            </div>
            <div className="bg-blue-700 p-4 rounded-lg">
              <h3 className="text-3xl font-bold">{stats.locations}</h3>
              <p>Lokasi Terlayani</p>
            </div>
            <div className="bg-blue-700 p-4 rounded-lg">
              <h3 className="text-3xl font-bold">{stats.donations}</h3>
              <p>Total Donasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Fitur Utama HealLink</h2>
          <p className="text-xl text-gray-600">Beragam cara untuk berkontribusi dan melihat dampak nyata</p>
        </div>

        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(1)}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Heart className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Sistem Donasi & Crowdfunding</h3>
              </div>
              <ChevronDown 
                className={`text-gray-500 transition-transform ${activeFeature === 1 ? 'transform rotate-180' : ''}`} 
                size={24} 
              />
            </div>
            {activeFeature === 1 && (
              <div className="p-4 bg-gray-50 border-t">
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
                    <img src="/api/placeholder/300/200" alt="Donasi System" className="rounded-lg" />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/donation">
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Mulai Berdonasi</button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(2)}
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <PieChart className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Dashboard Tracking Dampak Sosial</h3>
              </div>
              <ChevronDown 
                className={`text-gray-500 transition-transform ${activeFeature === 2 ? 'transform rotate-180' : ''}`} 
                size={24} 
              />
            </div>
            {activeFeature === 2 && (
              <div className="p-4 bg-gray-50 border-t">
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
                    <img src="/api/placeholder/300/200" alt="Impact Dashboard" className="rounded-lg" />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/impact">
                    <button className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Lihat Dampak</button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(3)}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Users className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Manajemen Relawan</h3>
              </div>
              <ChevronDown 
                className={`text-gray-500 transition-transform ${activeFeature === 3 ? 'transform rotate-180' : ''}`} 
                size={24} 
              />
            </div>
            {activeFeature === 3 && (
              <div className="p-4 bg-gray-50 border-t">
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
                    <img src="/api/placeholder/300/200" alt="Volunteer Management" className="rounded-lg" />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/volunteer">
                    <button className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Jadi Relawan</button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(4)}
            >
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <MapPin className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Kemitraan CSR & Perusahaan</h3>
              </div>
              <ChevronDown 
                className={`text-gray-500 transition-transform ${activeFeature === 4 ? 'transform rotate-180' : ''}`} 
                size={24} 
              />
            </div>
            {activeFeature === 4 && (
              <div className="p-4 bg-gray-50 border-t">
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
                    <img src="/api/placeholder/300/200" alt="CSR Partnership" className="rounded-lg" />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/partner">
                    <button className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Jadi Mitra</button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleFeature(5)}
            >
              <div className="flex items-center">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <MessageCircle className="text-teal-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">AI Chatbot Kesehatan</h3>
              </div>
              <ChevronDown 
                className={`text-gray-500 transition-transform ${activeFeature === 5 ? 'transform rotate-180' : ''}`} 
                size={24} 
              />
            </div>
            {activeFeature === 5 && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Asisten Kesehatan Virtual</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Chatbot untuk informasi kesehatan dasar</li>
                      <li>Bantuan penilaian awal untuk gejala umum</li>
                      <li>Panduan pertolongan pertama sederhana</li>
                      <li>Rujukan ke relawan medis atau klinik terdekat</li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    <img src="/api/placeholder/300/200" alt="Health Chatbot" className="rounded-lg" />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/chatbot">
                    <button className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Coba Chatbot</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Jadilah Bagian dari Perubahan</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Setiap kontribusi Anda, baik berupa donasi, menjadi relawan, atau menjadi mitra, membantu kami mewujudkan akses kesehatan yang lebih baik untuk semua.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">Daftar Sekarang</button>
            </Link>
            <Link href="/about">
              <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-700">Pelajari Lebih Lanjut</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HealLink</h3>
              <p className="text-gray-300">
                Menghubungkan donatur, relawan, dan masyarakat untuk akses kesehatan yang lebih baik.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tautan</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white">Tentang Kami</Link></li>
                <li><Link href="/projects" className="text-gray-300 hover:text-white">Proyek</Link></li>
                <li><Link href="/impact" className="text-gray-300 hover:text-white">Dampak</Link></li>
                <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bergabung</h4>
              <ul className="space-y-2">
                <li><Link href="/donation" className="text-gray-300 hover:text-white">Donasi</Link></li>
                <li><Link href="/volunteer" className="text-gray-300 hover:text-white">Jadi Relawan</Link></li>
                <li><Link href="/partner" className="text-gray-300 hover:text-white">Kemitraan</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-white">Karir</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">info@heallink.id</li>
                <li className="text-gray-300">+62 812-3456-7890</li>
                <li className="text-gray-300">Jl. Kesehatan No. 123, Jakarta</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300">&copy; {new Date().getFullYear()} HealLink. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}