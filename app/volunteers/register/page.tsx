'use client';

import { useState, FormEvent, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface FormData {
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

function LocationPicker({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function VolunteerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    specialization: '',
    experience: '',
    availability: '',
    location: '',
    contactPhone: '',
    medicalLicense: '',
    bio: '',
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
      }
    }
    checkSession();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to register volunteer');
      }

      // Redirect to profile after successful registration
      router.push('/volunteers');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Daftar Relawan - HealLink</title>
      </Head>

      <header className="bg-teal-600 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">Formulir Pendaftaran Relawan</h1>
          <p className="text-teal-100 mt-2">Isi data Anda untuk bergabung sebagai relawan medis HealLink</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label htmlFor="specialization" className="block text-gray-700 font-medium mb-2">
              Spesialisasi Medis*
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
              Pengalaman*
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            <label htmlFor="availability" className="block text-gray-700 font-medium mb-2">
              Ketersediaan Waktu*
            </label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">-- Pilih Ketersediaan --</option>
              <option value="Akhir Pekan">Akhir Pekan</option>
              <option value="Weekdays">Hari Kerja</option>
              <option value="Full-time">Full-time</option>
              <option value="On-call">On-call</option>
              <option value="Sesuai Jadwal Proyek">Menyesuaikan dengan Jadwal Proyek</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
              Lokasi*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Contoh: Jakarta, Bali"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="Contoh: +6281234567890"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="medicalLicense" className="block text-gray-700 font-medium mb-2">
              Nomor Lisensi Medis
            </label>
            <input
              type="text"
              id="medicalLicense"
              name="medicalLicense"
              value={formData.medicalLicense}
              onChange={handleChange}
              placeholder="Masukkan nomor lisensi (jika ada)"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">
              Catatan Tambahan / Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Ceritakan tentang diri Anda atau catatan lainnya"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Pilih Lokasi di Peta</label>
            <div className="h-64 bg-gray-200 rounded-lg mb-2">
              <MapContainer
                center={[formData.latitude || -2.5489, formData.longitude || 118.0149] as LatLngExpression}
                zoom={formData.latitude && formData.longitude ? 10 : 5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationPicker
                  onLocationChange={(lat, lng) =>
                    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }))
                  }
                />
                {formData.latitude && formData.longitude && (
                  <Marker position={[formData.latitude, formData.longitude] as LatLngExpression} />
                )}
              </MapContainer>
            </div>
            <p className="text-sm text-gray-600">
              Klik pada peta untuk memilih lokasi. Koordinat: {formData.latitude?.toFixed(4) || '-'},{' '}
              {formData.longitude?.toFixed(4) || '-'}
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Mengirim...' : 'Kirim Pendaftaran'}
          </button>
        </form>
      </main>
    </div>
  );
}