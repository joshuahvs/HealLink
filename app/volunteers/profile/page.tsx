'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Change this import
import { getSession } from 'next-auth/react';
import Link from 'next/link';

interface User {
  name: string;
}

interface Volunteer {
  id: string | number;
  user: User;
  specialization: string;
  experience: string;
  availability: string;
  location: string;
  contactPhone?: string;
  medicalLicense?: string;
  bio?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export default function VolunteerProfile() {
  const router = useRouter();
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    specialization: '',
    experience: '',
    availability: '',
    location: '',
    contactPhone: '',
    medicalLicense: '',
    bio: '',
    latitude: null as number | null,
    longitude: null as number | null,
  });

  // Check if user is logged in
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
      }
    };

    checkSession();
  }, [router]);

  // Fetch volunteer data
  useEffect(() => {
    async function fetchVolunteerProfile() {
      const session = await getSession();
      if (!session) return;

      try {
        const response = await fetch('/api/volunteers/profile');

        if (response.status === 404) {
          router.push('/volunteer/register');
          return;
        }

        if (!response.ok) {
          throw new Error('Gagal memuat profil volunteer');
        }

        const data = await response.json();
        setVolunteer(data);
        setFormData({
          specialization: data.specialization || '',
          experience: data.experience || '',
          availability: data.availability || '',
          location: data.location || '',
          contactPhone: data.contactPhone || '',
          medicalLicense: data.medicalLicense || '',
          bio: data.bio || '',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVolunteerProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/volunteers/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan saat memperbarui profil');
      }

      setVolunteer(data);
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Profil Relawan - HealLink</title>
      </Head>

      <header className="bg-teal-600 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">Profil Relawan</h1>
          <p className="text-teal-100 mt-2">Kelola informasi relawan Anda</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/volunteer" className="text-teal-600 hover:text-teal-800">
            ← Kembali ke Halaman Relawan
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Informasi Relawan</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
                >
                  Edit Profil
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                    Spesialisasi Medis*
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">-- Pilih Spesialisasi --</option>
                    <option value="Dokter Umum">Dokter Umum</option>
                    <option value="Dokter Spesialis">Dokter Spesialis</option>
                    <option value="Perawat">Perawat</option>
                    <option value="Bidan">Bidan</option>
                    <option value="Apoteker">Apoteker</option>
                    <option value="Asisten Apoteker">Asisten Apoteker</option>
                    <option value="Ahli Gizi">Ahli Gizi</option>
                    <option value="Teknisi Laboratorium">Teknisi Laboratorium</option>
                    <option value="Kesehatan Masyarakat">Kesehatan Masyarakat</option>
                    <option value="Mahasiswa Kedokteran">Mahasiswa Kedokteran</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Pengalaman*
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">-- Pilih Pengalaman --</option>
                    <option value="< 1 tahun">Kurang dari 1 tahun</option>
                    <option value="1-3 tahun">1-3 tahun</option>
                    <option value="3-5 tahun">3-5 tahun</option>
                    <option value="5-10 tahun">5-10 tahun</option>
                    <option value="> 10 tahun">Lebih dari 10 tahun</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                    Ketersediaan Waktu*
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">-- Pilih Ketersediaan --</option>
                    <option value="Akhir Pekan">Akhir Pekan</option>
                    <option value="Weekdays">Hari Kerja</option>
                    <option value="Full-time">Full-time</option>
                    <option value="On-call">On-call</option>
                    <option value="Sesuai Jadwal Proyek">Menyesuaikan dengan Jadwal Proyek</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
                  >
                    Simpan Perubahan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : volunteer ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Spesialisasi Medis</h3>
                  <p className="text-lg font-medium text-gray-900">{volunteer.specialization}</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Pengalaman</h3>
                  <p className="text-lg font-medium text-gray-900">{volunteer.experience}</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Ketersediaan Waktu</h3>
                  <p className="text-lg font-medium text-gray-900">{volunteer.availability}</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Nomor Telepon</h3>
                  <p className="text-lg font-medium text-gray-900">{volunteer.contactPhone}</p>
                </div>
              </div>
            ) : (
              <p>Data profil tidak tersedia.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}