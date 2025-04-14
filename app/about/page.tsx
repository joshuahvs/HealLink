// pages/about.tsx
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Heart, PieChart, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-section">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang HealLink</h1>
          <p className="text-xl max-w-3xl mx-auto">
            HealLink adalah klinik keliling berbasis crowdfunding yang membawa layanan kesehatan gratis ke daerah terpencil
            Indonesia, menghubungkan gotong royong masyarakat dengan teknologi untuk pemerataan kesehatan.
          </p>
        </div>
      </div>

      {/* Background Section */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Latar Belakang</h2>
            <p className="text-gray-600 mb-4">
              Indonesia menghadapi tantangan besar dalam pemerataan layanan kesehatan. Lebih dari 50% desa di 11 provinsi
              kesulitan mengakses rumah sakit, dengan rasio tenaga medis yang tidak merata—9,53 per 10.000 penduduk di
              Jakarta versus 3,3 di Nusa Tenggara Timur. Akibatnya, banyak kasus kesehatan menjadi serius karena
              keterlambatan penanganan.
            </p>
            <p className="text-gray-600">
              Menurut Riskesdas 2018, 42,4% warga pedesaan menganggap akses ke rumah sakit sulit. Program pemerintah
              seperti Puskesmas Keliling belum cukup menjangkau semua wilayah karena keterbatasan sumber daya.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/api/placeholder/500/300"
              alt="Kondisi Kesehatan Pedesaan"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Solusi Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Klinik Keliling</h3>
              <p className="text-gray-600">
                Mobil medis dengan alat kesehatan dasar dan tenaga medis profesional menjangkau pelosok Indonesia.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <PieChart className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crowdfunding</h3>
              <p className="text-gray-600">
                Pendanaan dari donasi publik, CSR perusahaan, dan hibah filantropi dengan transparansi penuh.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kolaborasi Penta-Helix</h3>
              <p className="text-gray-600">
                Melibatkan masyarakat, pemerintah, swasta, akademisi, dan media untuk ekosistem kesehatan yang inklusif.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Bergabung dengan Kami</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari misi HealLink untuk membawa kesehatan ke setiap pelosok Indonesia melalui donasi,
            relawan, atau kemitraan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">
                Daftar Sekarang
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-700">
                Hubungi Kami
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}