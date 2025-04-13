
"use client";

import '../../globals.css';
import { useState, useEffect } from "react";
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
  Users
} from "lucide-react";


export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(3);
  const [userData, setUserData] = useState<any>(null);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [volunteerActivities, setVolunteerActivities] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [impactStats, setImpactStats] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/users/me');
        const userData = await userResponse.json();
        console.log("Fetched user data:", userData); 
        setUserData(userData);

        // Fetch recent donations
        const donationsResponse = await fetch(`/api/donations?userId=${userData.id}`);
        const donationsData = await donationsResponse.json();
        setRecentDonations(donationsData);

        // Fetch projects
        const projectsResponse = await fetch(`/api/projects?userId=${userData.id}`);
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        // Fetch subscription details
        const subscriptionResponse = await fetch(`/api/subscriptions?userId=${userData.id}`);
        const subscriptionData = await subscriptionResponse.json();
        setSubscriptionDetails(subscriptionData);

        // Fetch impact stats
        const impactResponse = await fetch(`/api/impacts?userId=${userData.id}`);
        const impactData = await impactResponse.json();
        setImpactStats(impactData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);  // Only run once after the initial render

  if (!userData) return <div>Loading...</div>; // Add loading state for when user data is being fetched

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
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
              <span className="hidden md:inline-block font-medium">{userData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <div className="flex flex-col items-center py-4 mb-6 border-b">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <User size={32} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.email}</p>
                <div className="mt-2">
                  {userData.isSubscriber && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      Donatur Tetap
                    </span>
                  )}
                </div>
              </div>

              <nav className="space-y-1">
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "overview" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart2 size={18} />
                  <span>Overview</span>
                </button>
                <button 
                  disabled={!userData}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 disabled:opacity-50"
                  onClick={() => userData && router.push(`/donations?userId=${userData.id}`)} // Update URL ke list donasi berdasarkan userId
                >
                  <Heart size={18} />
                  <span>Donasi Saya</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "volunteer" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => {
                    setActiveTab("volunteer");
                    router.push('/volunteers'); // Navigate to /app/volunteers
                  }}
                >
                  <Users size={18} />
                  <span>Aktivitas Relawan</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "projects" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => {
                    setActiveTab("projects");
                    router.push('/projects'); 
                  }}
                >
                  <MapPin size={18} />
                  <span>Proyek Kesehatan</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "impact" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => setActiveTab("impact")}
                >
                  <BarChart2 size={18} />
                  <span>Dampak Sosial</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "subscription" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => {
                    setActiveTab("subscription");
                    router.push('/subscription'); // This will navigate to /app/subscription
                  }}
                >
                  <CreditCard size={18} />
                  <span>Langganan</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings size={18} />
                  <span>Pengaturan</span>
                </button>
                <hr className="my-3" />
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
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
                  <h2 className="text-lg font-semibold mb-4">Overview Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Donasi Total */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Total Donasi</p>
                          <h3 className="text-xl font-semibold text-gray-800">{userData.donationTotal}</h3>
                        </div>
                        <div className="bg-blue-100 p-2 rounded">
                          <Heart size={20} className="text-blue-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{userData.donationCount} donasi</p>
                    </div>

                    {/* Status Langganan */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Status Langganan</p>
                          <h3 className="text-xl font-semibold text-gray-800">{userData.isSubscriber ? "Aktif" : "Tidak Aktif"}</h3>
                        </div>
                        <div className="bg-green-100 p-2 rounded">
                          <CreditCard size={20} className="text-green-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Donasi terakhir: {userData.lastDonation}</p>
                    </div>

                    {/* Jam Relawan */}
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Jam Relawan</p>
                          <h3 className="text-xl font-semibold text-gray-800">{userData.volunteerHours} jam</h3>
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
                          <p className="text-sm text-gray-500">Aktivitas Mendatang</p>
                          <h3 className="text-xl font-semibold text-gray-800">{userData.upcomingEvents}</h3>
                        </div>
                        <div className="bg-orange-100 p-2 rounded">
                          <Calendar size={20} className="text-orange-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Dalam 30 hari ke depan</p>
                    </div>
                  </div>

                  {/* Donasi Terbaru */}
                  <div className="mb-6">
                  <h3 className="text-md font-semibold mb-4">Donasi Terbaru</h3>
<div className="space-y-3">
  {/* Ensure recentDonations is defined and is an array before calling slice */}
  {(recentDonations?.length > 0 ? recentDonations.slice(0, 2) : []).map(donation => (
    <div key={donation.id} className="flex items-center justify-between border-b pb-3">
      <div className="flex items-center">
        <div className="bg-blue-100 p-2 rounded mr-4">
          {/* Your donation content here */}
        </div>
      </div>
    </div>
  ))}
</div>

                    <div className="mt-4 text-center">
                      <Link href="pages/donations">
                        <button className="text-blue-600 text-sm font-medium hover:underline flex items-center justify-center mx-auto">
                          Lihat semua donasi
                          <ChevronRight size={16} />
                        </button>
                      </Link>
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
