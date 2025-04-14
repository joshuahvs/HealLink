"use client";

import "../../globals.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Calendar,
  User,
  MapPin,
  Clock,
  CreditCard,
  BarChart2,
  Settings,
  ChevronRight,
  LogOut,
  Bell,
  ArrowUp,
  Users,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

// Dummy data
const dummyUserData = {
  name: "Regina Aruan",
  email: "reginaaruan@gmail.com",
  isSubscriber: true,
  donationTotal: "Rp 5.000.000",
  donationCount: 12,
  lastDonation: "24 Mar 2025",
  volunteerHours: 24,
  upcomingEvents: 3,
};

const dummyRecentDonations = [
  {
    id: 1,
    project: "Bantuan Medis Daerah Terpencil",
    amount: "Rp 1.000.000",
    date: "12 Apr 2025",
  },
  {
    id: 2,
    project: "Pengobatan Gratis Lansia",
    amount: "Rp 500.000",
    date: "10 Apr 2025",
  },
];

export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600">HealLink</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <span className="hidden md:inline-block font-medium">
                {dummyUserData.name}
              </span>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <div className="flex flex-col items-center py-4 mb-6 border-b">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <User size={32} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold">{dummyUserData.name}</h2>
                <p className="text-sm text-gray-500">{dummyUserData.email}</p>
                <div className="mt-2">
                  {dummyUserData.isSubscriber && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      Donatur Tetap
                    </span>
                  )}
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${
                    activeTab === "overview"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart2 size={18} />
                  <span>Overview</span>
                </button>
                <button
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
                  onClick={() => router.push("/donations")}
                >
                  <Heart size={18} />
                  <span>Donasi Saya</span>
                </button>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700`}
                  onClick={() => router.push("/volunteers")}
                >
                  <Users size={18} />
                  <span>Aktivitas Relawan</span>
                </button>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700`}
                  onClick={() => router.push("/projects")}
                >
                  <MapPin size={18} />
                  <span>Proyek Kesehatan</span>
                </button>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700`}
                  onClick={() => setActiveTab("impact")}
                >
                  <BarChart2 size={18} />
                  <span>Dampak Sosial</span>
                </button>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700`}
                  onClick={() => router.push("/subscription")}
                >
                  <CreditCard size={18} />
                  <span>Langganan</span>
                </button>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings size={18} />
                  <span>Pengaturan</span>
                </button>
                <hr className="my-3" />
                <button
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                  onClick={() => router.push("/auth/login")}
                >
                  <LogOut size={18} />
                  <span>Keluar</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Overview Dashboard
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Donasi Total */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Total Donasi</p>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {dummyUserData.donationTotal}
                          </h3>
                        </div>
                        <div className="bg-blue-100 p-2 rounded">
                          <Heart size={20} className="text-blue-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {dummyUserData.donationCount} donasi
                      </p>
                    </div>

                    {/* Status Langganan */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">
                            Status Langganan
                          </p>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {dummyUserData.isSubscriber
                              ? "Aktif"
                              : "Tidak Aktif"}
                          </h3>
                        </div>
                        <div className="bg-green-100 p-2 rounded">
                          <CreditCard size={20} className="text-green-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Donasi terakhir: {dummyUserData.lastDonation}
                      </p>
                    </div>

                    {/* Jam Relawan */}
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Jam Relawan</p>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {dummyUserData.volunteerHours} jam
                          </h3>
                        </div>
                        <div className="bg-purple-100 p-2 rounded">
                          <Clock size={20} className="text-purple-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">2 aktivitas</p>
                    </div>

                    {/* Aktivitas Mendatang */}
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">
                            Aktivitas Mendatang
                          </p>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {dummyUserData.upcomingEvents}
                          </h3>
                        </div>
                        <div className="bg-orange-100 p-2 rounded">
                          <Calendar size={20} className="text-orange-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Dalam 30 hari ke depan
                      </p>
                    </div>
                  </div>

                  {/* Donasi Terbaru */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold mb-4">
                      Donasi Terbaru
                    </h3>
                    <div className="space-y-3">
                      {dummyRecentDonations.map((donation) => (
                        <div
                          key={donation.id}
                          className="flex items-center justify-between border-b pb-3"
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded mr-4">
                              <Heart size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                {donation.project}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {donation.date}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {donation.amount}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-center">
                      <button
                        onClick={() => router.push("/donations")}
                        className="text-blue-600 text-sm font-medium hover:underline flex items-center justify-center mx-auto"
                      >
                        Lihat semua donasi
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
