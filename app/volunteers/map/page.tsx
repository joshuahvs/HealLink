'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface User {
  name: string;
}

interface Volunteer {
  id: string | number;
  user: User;
  specialization: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  contactPhone?: string;
}

// Custom car icon
const carIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/color/48/000000/car.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function VolunteerMap() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        const response = await fetch('/api/volunteers/map');
        if (!response.ok) {
          throw new Error('Gagal memuat data relawan');
        }
        const data: Volunteer[] = await response.json();
        setVolunteers(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchVolunteers();
  }, []);

  const volunteersBySpecialization = volunteers.reduce((groups: Record<string, Volunteer[]>, volunteer) => {
    const { specialization } = volunteer;
    if (!groups[specialization]) {
      groups[specialization] = [];
    }
    groups[specialization].push(volunteer);
    return groups;
  }, {});

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Peta Relawan Medis - HealLink</title>
      </Head>

      <header className="bg-teal-600 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">Peta Relawan Medis</h1>
          <p className="text-teal-100 mt-2">Melihat distribusi relawan medis HealLink di Indonesia</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/volunteers" className="text-teal-600 hover:text-teal-800">
            ← Kembali ke Halaman Relawan
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Peta Distribusi Relawan</h2>
              <div className="h-96 bg-gray-200 rounded-lg shadow-md mb-4">
                <MapContainer
                  center={[-2.5489, 118.0149] as LatLngExpression}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {volunteers.map(
                    (volunteer) =>
                      volunteer.latitude &&
                      volunteer.longitude && (
                        <Marker
                          key={volunteer.id}
                          position={[volunteer.latitude, volunteer.longitude] as LatLngExpression}
                          icon={carIcon}
                        >
                          <Popup>
                            <strong>{volunteer.user.name}</strong>
                            <br />
                            Spesialisasi: {volunteer.specialization}
                            <br />
                            Lokasi: {volunteer.location}
                            {volunteer.contactPhone && (
                              <>
                                <br />
                                Telepon: {volunteer.contactPhone}
                              </>
                            )}
                          </Popup>
                        </Marker>
                      )
                  )}
                </MapContainer>
              </div>
              <p className="text-sm text-gray-600">
                Menampilkan {volunteers.length} relawan yang telah membagikan lokasi mereka.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Statistik Relawan</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(volunteersBySpecialization).map(([specialization, specialVolunteers]) => (
                  <div key={specialization} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-gray-800">{specialization}</h3>
                    <p className="text-2xl font-bold text-teal-600">{specialVolunteers.length}</p>
                    <p className="text-sm text-gray-600">relawan</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Relawan per Lokasi</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Spesialisasi
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lokasi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {volunteers.map((volunteer) => (
                      <tr key={volunteer.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">{volunteer.user.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{volunteer.specialization}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{volunteer.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {volunteers.length === 0 && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Belum ada relawan yang terdaftar dengan lokasi.</p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-12 bg-teal-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-teal-700 mb-2">Bergabunglah sebagai Relawan</h2>
          <p className="text-teal-800 mb-4">
            Distribusi relawan medis masih belum merata di seluruh Indonesia. Jadilah bagian dari
            perubahan dan bantu kami menjangkau lebih banyak area yang membutuhkan.
          </p>
          <Link
            href="/volunteers/register"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Daftar Sebagai Relawan
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center">
            © {new Date().getFullYear()} HealLink Indonesia - Menjembatani Kesenjangan Layanan
            Kesehatan
          </p>
        </div>
      </footer>
    </div>
  );
}