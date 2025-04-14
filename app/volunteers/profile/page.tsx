"use client";

import { useRouter } from "next/navigation";
import {
  MapPin,
  User,
  Calendar,
  Clock,
  Shield,
  Award,
  Bookmark,
  Settings,
  FileText,
} from "lucide-react";

// Dummy volunteer data
const dummyVolunteerData = {
  name: "Regina Aruan",
  role: "Dokter Umum",
  location: "Jakarta",
  joinedDate: "April 2025",
  totalHours: 48,
  projectsCompleted: 3,
  upcomingProjects: 2,
  verificationStatus: "Terverifikasi",
  skills: ["Dokter Umum", "Perawatan Darurat", "Vaksinasi"],
  availability: "Part-time",
  bio: "Dokter umum dengan pengalaman 5 tahun di pelayanan kesehatan masyarakat. Berdedikasi untuk memberikan bantuan medis kepada masyarakat yang membutuhkan.",
  impact: {
    peopleHelped: 250,
    hoursContributed: 48,
    projectsJoined: 3,
    locationsServed: 2,
  },
  currentProjects: [
    {
      id: 1,
      name: "Bantuan Medis Daerah Terpencil",
      role: "Dokter Umum",
      location: "Nusa Tenggara Timur",
      startDate: "1 Mei 2025",
      duration: "3 bulan",
      status: "Aktif",
    },
  ],
  completedProjects: [
    {
      id: 1,
      name: "Program Vaksinasi Anak",
      role: "Dokter Pelaksana",
      location: "Jakarta Timur",
      date: "Mar 2025",
      impact: "75 anak tervaksinasi",
    },
    {
      id: 2,
      name: "Pengobatan Gratis Lansia",
      role: "Dokter Umum",
      location: "Jakarta Selatan",
      date: "Feb 2025",
      impact: "50 lansia terbantu",
    },
  ],
  badges: [
    {
      id: 1,
      name: "Healthcare Hero",
      icon: "🏥",
      description: "Memberikan 50+ jam pelayanan kesehatan",
    },
    {
      id: 2,
      name: "First Responder",
      icon: "⚡",
      description: "Berpartisipasi dalam 3+ program kesehatan",
    },
  ],
};

export default function VolunteerProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {dummyVolunteerData.name}
                    {dummyVolunteerData.verificationStatus ===
                      "Terverifikasi" && (
                      <Shield size={20} className="text-green-500" />
                    )}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{dummyVolunteerData.role}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{dummyVolunteerData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Bergabung {dummyVolunteerData.joinedDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("/volunteers/profile/edit")}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Settings size={18} />
                    Edit Profil
                  </button>
                  <button
                    onClick={() => router.push("/volunteers/map")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <MapPin size={18} />
                    Cari Proyek
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Tentang Saya</h2>
              <p className="text-gray-600">{dummyVolunteerData.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Keahlian</h2>
              <div className="flex flex-wrap gap-2">
                {dummyVolunteerData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Badges</h2>
              <div className="space-y-4">
                {dummyVolunteerData.badges.map((badge) => (
                  <div key={badge.id} className="flex items-start gap-3">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <div className="font-medium">{badge.name}</div>
                      <div className="text-sm text-gray-500">
                        {badge.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Impact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {dummyVolunteerData.impact.peopleHelped}
                </div>
                <div className="text-sm text-gray-500">Orang Terbantu</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {dummyVolunteerData.impact.hoursContributed}
                </div>
                <div className="text-sm text-gray-500">Jam Kontribusi</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {dummyVolunteerData.impact.projectsJoined}
                </div>
                <div className="text-sm text-gray-500">Proyek Diikuti</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {dummyVolunteerData.impact.locationsServed}
                </div>
                <div className="text-sm text-gray-500">Lokasi Dilayani</div>
              </div>
            </div>

            {/* Current Projects */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Proyek Aktif</h2>
              <div className="space-y-4">
                {dummyVolunteerData.currentProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>{project.role}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>Mulai {project.startDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>Durasi: {project.duration}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Projects */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Riwayat Proyek</h2>
              <div className="space-y-4">
                {dummyVolunteerData.completedProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>{project.role}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{project.date}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-blue-600">
                          <Award size={16} className="inline mr-1" />
                          {project.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
