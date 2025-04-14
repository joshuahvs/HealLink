// app/volunteers/page.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Navbar from '../components/Navbar';

const VolunteerInfo = async () => {
    const session = await getServerSession(authOptions);
  
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Program Relawan Medis</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              Program Relawan Medis HealLink adalah inisiatif yang bertujuan menghubungkan tenaga medis sukarelawan 
              dengan masyarakat di daerah terpencil Indonesia yang memiliki keterbatasan akses layanan kesehatan.
            </p>
            <p className="text-gray-700 mb-4">
              Sebagai relawan, Anda akan memiliki kesempatan untuk:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li className="mb-2">Memberikan pelayanan kesehatan langsung kepada masyarakat yang membutuhkan</li>
              <li className="mb-2">Berpartisipasi dalam klinik keliling yang menjangkau daerah terpencil</li>
              <li className="mb-2">Berbagi pengetahuan dan keterampilan dengan tenaga medis lokal</li>
              <li className="mb-2">Meningkatkan kesadaran kesehatan melalui program edukasi</li>
              <li className="mb-2">Menjadi bagian dari solusi untuk mengatasi kesenjangan layanan kesehatan di Indonesia</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bagaimana Cara Kerjanya?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Daftar</h3>
              <p className="text-gray-700">
                Isi formulir pendaftaran dengan informasi tentang latar belakang medis, spesialisasi, 
                dan ketersediaan Anda.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pilih Proyek</h3>
              <p className="text-gray-700">
                Pilih proyek yang sesuai dengan keahlian dan ketersediaan Anda. Kami memiliki berbagai 
                program di seluruh Indonesia.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Berikan Dampak</h3>
              <p className="text-gray-700">
                Bergabunglah dengan tim HealLink di lapangan dan berikan pelayanan kesehatan berkualitas 
                kepada masyarakat yang membutuhkan.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Siapa yang Dapat Menjadi Relawan?</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              Kami menerima berbagai tenaga medis profesional dengan kualifikasi yang sesuai:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Dokter (umum dan spesialis)
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Perawat
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Bidan
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Apoteker dan Asisten Apoteker
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Ahli Gizi
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Teknisi Laboratorium
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Ahli Kesehatan Masyarakat
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 bg-teal-500 rounded-full"></span>
                Mahasiswa Kedokteran Tingkat Akhir
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              Semua relawan harus memiliki lisensi atau sertifikasi yang sesuai dan valid di Indonesia.
            </p>
          </div>
        </section>

        <div className="bg-teal-50 p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Siap Berkontribusi?</h2>
        <p className="text-teal-800 mb-6">
          Jadilah bagian dari perubahan. Bergabunglah dengan kami untuk membantu masyarakat yang membutuhkan 
          akses ke layanan kesehatan.
        </p>
        {session ? (
          <Link 
            href="/volunteers/register" 
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
            Daftar Sekarang
          </Link>
        ) : (
          <Link 
            href="/auth/signin" 
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
            Masuk untuk Daftar
          </Link>
        )}
      </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Peta Relawan HealLink</h2>
          <p className="text-gray-700 mb-4">
            Lihat di mana relawan medis HealLink berada saat ini.
          </p>
          <Link 
            href="/volunteers/map" 
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200">
            Lihat Peta Relawan
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pertanyaan Umum</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Berapa lama komitmen waktu yang dibutuhkan?</h3>
              <p className="text-gray-700">
                HealLink menawarkan berbagai pilihan komitmen, mulai dari beberapa hari hingga beberapa minggu. 
                Anda dapat memilih proyek yang sesuai dengan ketersediaan Anda.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Apakah biaya perjalanan dan akomodasi ditanggung?</h3>
              <p className="text-gray-700">
                Biaya perjalanan dan akomodasi untuk relawan yang ditempatkan di luar daerah asal akan ditanggung oleh HealLink.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VolunteerInfo;
