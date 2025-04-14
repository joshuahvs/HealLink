"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

const skills = [
  "Dokter Umum",
  "Dokter Spesialis",
  "Perawat",
  "Bidan",
  "Apoteker",
  "Administrasi",
  "Koordinator",
  "Logistik",
];

const availabilityOptions = [
  "Full-time",
  "Part-time",
  "Weekends only",
  "Flexible",
];

const cities = [
  { name: "Jakarta", position: [-6.2088, 106.8456] },
  { name: "Surabaya", position: [-7.2575, 112.7521] },
  { name: "Medan", position: [3.5952, 98.6722] },
  { name: "Bandung", position: [-6.9175, 107.6191] },
  { name: "Makassar", position: [-5.1477, 119.4327] },
  { name: "Yogyakarta", position: [-7.7971, 110.3688] },
];

// Map marker selector component
function LocationSelector({
  onLocationSelect,
}: {
  onLocationSelect: (latlng: LatLng) => void;
}) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

export default function VolunteerRegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    latitude: 0,
    longitude: 0,
    occupation: "",
    education: "",
    experience: "",
    selectedSkills: [] as string[],
    availability: "",
    motivation: "",
  });
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If city is selected, update map marker
    if (name === "location") {
      const city = cities.find((c) => c.name === value);
      if (city) {
        setMarkerPosition([city.position[0], city.position[1]]);
        setFormData((prev) => ({
          ...prev,
          latitude: city.position[0],
          longitude: city.position[1],
        }));
      }
    }
  };

  const handleMapClick = (latlng: LatLng) => {
    setMarkerPosition([latlng.lat, latlng.lng]);
    setFormData((prev) => ({
      ...prev,
      latitude: latlng.lat,
      longitude: latlng.lng,
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Harap lengkapi semua field yang wajib diisi");
      return;
    }

    if (formData.selectedSkills.length === 0) {
      setError("Pilih minimal satu keahlian");
      return;
    }

    if (!formData.location || !markerPosition) {
      setError("Pilih lokasi pada peta");
      return;
    }

    // Dummy success - redirect to volunteer dashboard
    router.push("/volunteers/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Daftar Sebagai Relawan
          </h1>

          {error && (
            <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700 mb-6">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Informasi Pribadi
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
              </div>
            </div>

            {/* Location Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Lokasi</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pilih Kota <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih kota</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Lokasi Spesifik pada Peta{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[-2.5489, 118.0149]}
                    zoom={5}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationSelector onLocationSelect={handleMapClick} />
                    {markerPosition && <Marker position={markerPosition} />}
                  </MapContainer>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Klik pada peta untuk menandai lokasi Anda
                </p>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Informasi Profesional
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pekerjaan
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Pekerjaan saat ini"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pendidikan Terakhir
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Gelar dan institusi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pengalaman Relawan
                </label>
                <div className="mt-1">
                  <textarea
                    name="experience"
                    rows={3}
                    value={formData.experience}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ceritakan pengalaman anda sebagai relawan (opsional)"
                  />
                </div>
              </div>
            </div>

            {/* Skills and Availability */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Keahlian dan Ketersediaan
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Keahlian <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {skills.map((skill) => (
                    <label
                      key={skill}
                      className={`inline-flex items-center px-4 py-2 rounded-full border cursor-pointer
                        ${
                          formData.selectedSkills.includes(skill)
                            ? "bg-blue-50 border-blue-500 text-blue-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={formData.selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                      />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ketersediaan <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    name="availability"
                    required
                    value={formData.availability}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih ketersediaan waktu</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Motivasi
                </label>
                <div className="mt-1">
                  <textarea
                    name="motivation"
                    rows={4}
                    value={formData.motivation}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ceritakan motivasi anda menjadi relawan (opsional)"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
