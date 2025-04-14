"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

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

interface CityCluster {
  city: string;
  position: [number, number];
  count: number;
}

// Dummy data for city clusters
const dummyClusters: CityCluster[] = [
  { city: "Jakarta", position: [-6.2088, 106.8456], count: 25 },
  { city: "Surabaya", position: [-7.2575, 112.7521], count: 18 },
  { city: "Medan", position: [3.5952, 98.6722], count: 12 },
  { city: "Bandung", position: [-6.9175, 107.6191], count: 15 },
  { city: "Makassar", position: [-5.1477, 119.4327], count: 10 },
  { city: "Yogyakarta", position: [-7.7971, 110.3688], count: 8 },
];

// Dummy volunteer data
const dummyVolunteers: Volunteer[] = [
  {
    id: 1,
    user: { name: "Dr. Andi" },
    specialization: "Dokter Umum",
    location: "Jakarta",
    latitude: -6.2088,
    longitude: 106.8456,
    contactPhone: "08123456789",
  },
  {
    id: 2,
    user: { name: "Dr. Budi" },
    specialization: "Dokter Spesialis",
    location: "Surabaya",
    latitude: -7.2575,
    longitude: 112.7521,
    contactPhone: "08234567890",
  },
  // Add more dummy volunteers as needed
];

// Custom circle icon for clusters
const getClusterStyle = (count: number) => ({
  radius: Math.max(30, Math.min(count * 5, 50)),
  color: "#2563eb",
  fillColor: "#3b82f6",
  fillOpacity: 0.6,
  weight: 1,
});

export default function VolunteerMap() {
  const [volunteers] = useState<Volunteer[]>(dummyVolunteers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const volunteersBySpecialization = volunteers.reduce(
    (groups: Record<string, Volunteer[]>, volunteer) => {
      const { specialization } = volunteer;
      if (!groups[specialization]) {
        groups[specialization] = [];
      }
      groups[specialization].push(volunteer);
      return groups;
    },
    {}
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Peta Relawan Medis - HealLink</title>
      </Head>

      <header className="bg-teal-600 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">Peta Relawan Medis</h1>
          <p className="text-teal-100 mt-2">
            Melihat distribusi relawan medis HealLink di Indonesia
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link
            href="/volunteers"
            className="text-teal-600 hover:text-teal-800"
          >
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
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Peta Distribusi Relawan
              </h2>
              <div className="h-96 bg-gray-200 rounded-lg shadow-md mb-4">
                <MapContainer
                  center={[-2.5489, 118.0149] as LatLngExpression}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {dummyClusters.map((cluster) => (
                    <div key={cluster.city}>
                      <Circle
                        center={cluster.position}
                        {...getClusterStyle(cluster.count)}
                      >
                        <Popup>
                          <strong>{cluster.city}</strong>
                          <br />
                          {cluster.count} relawan
                        </Popup>
                      </Circle>
                    </div>
                  ))}
                </MapContainer>
              </div>
              <p className="text-sm text-gray-600">
                Menampilkan persebaran{" "}
                {dummyClusters.reduce((sum, cluster) => sum + cluster.count, 0)}{" "}
                relawan di seluruh Indonesia
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Statistik Relawan per Kota
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dummyClusters.map((cluster) => (
                  <div
                    key={cluster.city}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {cluster.city}
                    </h3>
                    <p className="text-2xl font-bold text-teal-600">
                      {cluster.count}
                    </p>
                    <p className="text-sm text-gray-600">relawan</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Statistik per Spesialisasi
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(volunteersBySpecialization).map(
                  ([specialization, specialVolunteers]) => (
                    <div
                      key={specialization}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {specialization}
                      </h3>
                      <p className="text-2xl font-bold text-teal-600">
                        {specialVolunteers.length}
                      </p>
                      <p className="text-sm text-gray-600">relawan</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}

        <div className="mt-12 bg-teal-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-teal-700 mb-2">
            Bergabunglah sebagai Relawan
          </h2>
          <p className="text-teal-800 mb-4">
            Distribusi relawan medis masih belum merata di seluruh Indonesia.
            Jadilah bagian dari perubahan dan bantu kami menjangkau lebih banyak
            area yang membutuhkan.
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
            © {new Date().getFullYear()} HealLink Indonesia - Menjembatani
            Kesenjangan Layanan Kesehatan
          </p>
        </div>
      </footer>
    </div>
  );
}
