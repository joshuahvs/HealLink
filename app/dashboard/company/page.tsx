"use client";

import '../../globals.css';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BarChart2, 
  CreditCard, 
  Settings, 
  Users, 
  LogOut, 
  ChevronRight, 
  DollarSign, 
  MapPin,
  AlertCircle,
  X
} from "lucide-react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// Define TypeScript interfaces for your data structures
interface Impact {
  id: string;
  patientsServed: number;
  project: Project;
}

interface Project {
  id: string;
  name: string;
  location: string;
  targetAmount: number;
  currentAmount: number;
  endDate?: string;
  impacts: Impact[];
}

interface Partnership {
  id: string;
  amount: number;
  startDate: string;
  status: string;
  project: Project;
}

interface CompanyDataType {
  name: string;
  email: string;
  donationTotal: string;
  partnershipCount: number;
  isSubscriber: boolean;
  lastContribution: string;
  isProfileCompleted: boolean;
}

interface ProjectStat {
  id: string;
  title: string;
  progress: number;
  target: string;
  raised: string;
  daysLeft: number;
  patients: number;
}

interface ImpactStats {
  patientsTreated: number;
  locationsServed: number;
  medicinesProvided: number;
  companiesActivated: number;
}

export default function CompanyDashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotification, setShowNotification] = useState(true);
  const [companyData, setCompanyData] = useState<CompanyDataType>({
    name: "",
    email: "",
    donationTotal: "Rp0",
    partnershipCount: 0,
    isSubscriber: false,
    lastContribution: "-",
    isProfileCompleted: false
  });

  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [projectStats, setProjectStats] = useState<ProjectStat[]>([]);
  const [impactStats, setImpactStats] = useState<ImpactStats>({
    patientsTreated: 0,
    locationsServed: 0,
    medicinesProvided: 0,
    companiesActivated: 0
  });

  // Fetch session on component mount
  useEffect(() => {
    async function loadSession() {
      const sessionData = await getSession();
      setSession(sessionData);
      setLoading(false);
    }
    
    loadSession();
  }, []);

  // Fetch company data once session is loaded
  useEffect(() => {
    if (session && session.user) {
      // Check if company profile exists
      const checkCompanyProfile = async () => {
        try {
          const response = await fetch(`/api/companies/profile?userId=${session.user.id}`);
          const data = await response.json();
          
          if (response.ok && data) {
            setCompanyData(prev => ({
              ...prev,
              isProfileCompleted: true
            }));
          } else {
            setCompanyData(prev => ({
              ...prev,
              isProfileCompleted: false
            }));
            // Show notification if profile is not completed
            setShowNotification(true);
          }
        } catch (error) {
          console.error('Error checking company profile:', error);
          setCompanyData(prev => ({
            ...prev,
            isProfileCompleted: false
          }));
          // Show notification if there was an error
          setShowNotification(true);
        }
      };

      // Fetch user info
      setCompanyData(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || ""
      }));

      // Check if company profile is completed
      checkCompanyProfile();

      // Fetch partnerships
      const fetchPartnerships = async () => {
        try {
          const response = await fetch('/api/partnerships');
          if (!response.ok) throw new Error('Failed to fetch partnerships');
          
          const data = await response.json() as Partnership[];
          setPartnerships(data);
          
          // Calculate total donation amount
          let total = 0;
          data.forEach(partnership => {
            total += partnership.amount;
          });
          
          // Get latest contribution date if available
          let latestDate = "-";
          if (data.length > 0) {
            const dates = data.map(p => new Date(p.startDate));
            const latest = new Date(Math.max(...dates.map(date => date.getTime())));
            latestDate = latest.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });
          }
          
          setCompanyData(prev => ({
            ...prev,
            donationTotal: `Rp${total.toLocaleString('id-ID')}`,
            partnershipCount: data.length,
            isSubscriber: data.some(p => p.status === "ACTIVE"),
            lastContribution: latestDate
          }));
        } catch (error) {
          console.error('Error fetching partnerships:', error);
        }
      };

      // Fetch project stats
      const fetchProjects = async () => {
        try {
          const response = await fetch('/api/projects');
          if (!response.ok) throw new Error('Failed to fetch projects');
          
          const data = await response.json() as Project[];
          
          const formattedProjects = data.map(project => {
            // Calculate days left
            const endDate = project.endDate ? new Date(project.endDate) : null;
            const today = new Date();
            const daysLeft = endDate ? Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0;
            
            // Calculate progress percentage
            const progress = Math.round((project.currentAmount / project.targetAmount) * 100);
            
            return {
              id: project.id,
              title: project.name,
              progress,
              target: `Rp${project.targetAmount.toLocaleString('id-ID')}`,
              raised: `Rp${project.currentAmount.toLocaleString('id-ID')}`,
              daysLeft: daysLeft > 0 ? daysLeft : 0,
              patients: project.impacts.reduce((sum, impact) => sum + impact.patientsServed, 0)
            };
          });
          
          setProjectStats(formattedProjects);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

      // Fetch impact stats
      const fetchImpacts = async () => {
        try {
          const response = await fetch('/api/impacts');
          if (!response.ok) throw new Error('Failed to fetch impacts');
          
          const data = await response.json() as Impact[];
          
          // Calculate aggregate impact statistics
          const patientsTreated = data.reduce((sum, impact) => sum + impact.patientsServed, 0);
          const locationsServed = new Set(data.map(impact => impact.project.location)).size;
          
          setImpactStats({
            patientsTreated,
            locationsServed,
            medicinesProvided: 500, // This would need to come from a real data source
            companiesActivated: 8 // This would need to come from a real data source
          });
        } catch (error) {
          console.error('Error fetching impacts:', error);
        }
      };

      fetchPartnerships();
      fetchProjects();
      fetchImpacts();
    }
  }, [session]);

  // Handle navigation to other pages
  const handleNavigation = (tab: string) => {
    if (tab === "partnerships" && session?.user.role === "MODERATOR") {
      // Only change the route for MODERATOR when they click on "partnerships"
      router.push('/company/manage');
    } else {
      // Keep the same routing for other tabs and for COMPANY role
      if (tab === "projects") {
        router.push('/projects');
      } else if (tab === "partnerships") {
        router.push('/company/partnerships');
      } else if (tab === "impact") {
        router.push('/impacts');
      } else if (tab === "profile") {
        router.push('/dashboard/company/profile');
      } else {
        setActiveTab(tab); // Update active tab for other cases
      }
    }
  };
  

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Not authenticated state
  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Banner */}
      {showNotification && !companyData.isProfileCompleted && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <AlertCircle size={18} className="text-yellow-500" />
              <p className="text-sm text-yellow-700">
                Lengkapi profil perusahaan Anda untuk memulai kemitraan CSR
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => handleNavigation("profile")}
                className="text-sm px-4 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
              >
                Lengkapi Profil
              </button>
              <button 
                onClick={() => setShowNotification(false)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600">HealLink</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users size={16} className="text-blue-600" />
              </div>
              <span className="hidden md:inline-block font-medium">{companyData.name}</span>
              {!companyData.isProfileCompleted && (
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                  Profil belum lengkap
                </span>
              )}
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
                  <Users size={32} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold">{companyData.name}</h2>
                <p className="text-sm text-gray-500">{companyData.email}</p>
                <div className="mt-2 flex flex-col items-center">
                  {companyData.isSubscriber && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full mb-2">
                      Partner CSR Aktif
                    </span>
                  )}
                  {!companyData.isProfileCompleted && (
                    <button 
                      onClick={() => handleNavigation("profile")}
                      className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition"
                    >
                      Lengkapi Profil
                    </button>
                  )}
                </div>
              </div>

              <nav className="space-y-1">
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "overview" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => handleNavigation("overview")}
                >
                  <BarChart2 size={18} />
                  <span>Overview</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "partnerships" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => handleNavigation("partnerships")}
                >
                  <Users size={18} />
                  <span>Kemitraan CSR</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "projects" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => handleNavigation("projects")}
                >
                  <MapPin size={18} />
                  <span>Proyek Kesehatan</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "impact" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => handleNavigation("impact")}
                >
                  <BarChart2 size={18} />
                  <span>Dampak Sosial</span>
                </button>
                <button 
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-700"}`}
                  onClick={() => handleNavigation("settings")}
                >
                  <Settings size={18} />
                  <span>Pengaturan</span>
                </button>
                <hr className="my-3" />
                <button 
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                  onClick={handleSignOut}
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
                {!companyData.isProfileCompleted && (
                  <div className="bg-yellow-50 rounded-lg shadow-sm p-6 border border-yellow-200">
                    <div className="flex items-start space-x-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <AlertCircle size={24} className="text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-yellow-800">Profil Perusahaan Belum Lengkap</h3>
                        <p className="text-sm text-yellow-700 mt-1 mb-3">
                          Untuk dapat bermitra dalam proyek CSR HealLink, Anda perlu melengkapi profil perusahaan terlebih dahulu.
                        </p>
                        <button 
                          onClick={() => handleNavigation("profile")}
                          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-md hover:bg-yellow-300 transition"
                        >
                          Lengkapi Profil Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Overview Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Donasi Total */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Total Donasi</p>
                          <h3 className="text-xl font-semibold text-gray-800">{companyData.donationTotal}</h3>
                        </div>
                        <div className="bg-blue-100 p-2 rounded">
                          <DollarSign size={20} className="text-blue-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{companyData.partnershipCount} kemitraan</p>
                    </div>

                    {/* Status Langganan */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Status Langganan</p>
                          <h3 className="text-xl font-semibold text-gray-800">{companyData.isSubscriber ? "Aktif" : "Tidak Aktif"}</h3>
                        </div>
                        <div className="bg-green-100 p-2 rounded">
                          <CreditCard size={20} className="text-green-600" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Kontribusi terakhir: {companyData.lastContribution}</p>
                    </div>
                  </div>

                  {/* Kemitraan Terbaru */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold mb-4">Kemitraan Terbaru</h3>
                    <div className="space-y-3">
                      {partnerships.slice(0, 2).map(partnership => (
                        <div key={partnership.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded mr-4">
                              <DollarSign size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{partnership.project.name}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(partnership.startDate).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Rp{partnership.amount.toLocaleString('id-ID')}</p>
                            <p className="text-xs text-green-600">
                              {partnership.project.impacts?.length > 0 
                                ? `${partnership.project.impacts.reduce((sum, impact) => sum + impact.patientsServed, 0)} pasien terlayani` 
                                : 'Belum ada data impact'}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {partnerships.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          Belum ada kemitraan. Mulai bermitra dengan proyek HealLink sekarang!
                        </div>
                      )}
                    </div>
                    
                    {partnerships.length > 0 && (
                      <div className="mt-4 text-center">
                        <button 
                          className="text-blue-600 text-sm font-medium hover:underline flex items-center justify-center mx-auto"
                          onClick={() => handleNavigation("partnerships")}
                        >
                          Lihat semua kemitraan
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Pengaturan</h2>
                <p className="text-gray-500 mb-4">Kelola pengaturan akun dan preferensi Anda di sini.</p>
                
                {/* Settings form would go here */}
                <div className="border-t mt-6 pt-6">
                  <h3 className="text-md font-semibold mb-3">Informasi Perusahaan</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
                      <input 
                        type="text" 
                        value={companyData.name} 
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        value={companyData.email} 
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100" 
                      />
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