"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Users,
  Calendar,
  Heart,
  Share2,
  ArrowLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Wallet,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

// Dummy project data
const dummyProject = {
  id: 1,
  title: "Bantuan Medis Daerah Terpencil",
  description:
    "Program bantuan medis untuk masyarakat di daerah terpencil yang sulit mengakses layanan kesehatan. Program ini bertujuan untuk memberikan layanan kesehatan dasar, pemeriksaan kesehatan, dan pengobatan gratis bagi masyarakat yang membutuhkan.",
  location: "Nusa Tenggara Timur",
  category: "Kesehatan",
  targetAmount: "Rp 50.000.000",
  raisedAmount: "Rp 35.000.000",
  progress: 70,
  volunteers: 25,
  daysLeft: 15,
  startDate: "1 Mei 2025",
  endDate: "15 Juni 2025",
  organizer: "HealLink Foundation",
  imageUrl:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800",
  impact: {
    beneficiaries: 1000,
    locations: 5,
    volunteers: 25,
    partneredClinics: 3,
  },
  updates: [
    {
      id: 1,
      date: "10 Apr 2025",
      title: "Persiapan Tim Medis",
      content:
        "Tim medis telah terbentuk dan akan melakukan pelatihan khusus sebelum penerjunan ke lapangan.",
    },
    {
      id: 2,
      date: "5 Apr 2025",
      title: "Survei Lokasi Selesai",
      content:
        "Telah dilakukan survei di 5 lokasi yang akan menjadi target program bantuan medis.",
    },
  ],
  donors: [
    {
      id: 1,
      name: "John Doe",
      amount: "Rp 1.000.000",
      date: "12 Apr 2025",
    },
    {
      id: 2,
      name: "Jane Smith",
      amount: "Rp 500.000",
      date: "10 Apr 2025",
    },
  ],
};

// Predefined donation amounts
const donationAmounts = [
  { value: 50000, label: "Rp 50.000" },
  { value: 100000, label: "Rp 100.000" },
  { value: 250000, label: "Rp 250.000" },
  { value: 500000, label: "Rp 500.000" },
  { value: 1000000, label: "Rp 1.000.000" },
];

export default function ProjectDetailPage() {
  const router = useRouter();
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!donationAmount || parseInt(donationAmount) < 10000) {
      setError("Minimal donasi Rp 10.000");
      return;
    }

    if (!paymentMethod) {
      setError("Pilih metode pembayaran");
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      router.push("/payment/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header Image */}
      <div className="relative h-96">
        <img
          src={dummyProject.imageUrl}
          alt={dummyProject.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-full hover:bg-white"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <MapPin size={16} />
            <span>{dummyProject.location}</span>
            <span className="mx-2">•</span>
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
              {dummyProject.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {dummyProject.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="text-gray-600 mb-6">{dummyProject.description}</p>

              {/* Progress Section */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-lg">
                      {dummyProject.raisedAmount}
                    </span>
                    <span className="text-gray-500">
                      dari {dummyProject.targetAmount}
                    </span>
                  </div>
                  <div className="h-2 bg-blue-100 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${dummyProject.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {dummyProject.impact.beneficiaries}
                    </div>
                    <div className="text-sm text-gray-600">
                      Penerima Manfaat
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {dummyProject.impact.locations}
                    </div>
                    <div className="text-sm text-gray-600">Lokasi</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {dummyProject.impact.volunteers}
                    </div>
                    <div className="text-sm text-gray-600">Relawan</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {dummyProject.impact.partneredClinics}
                    </div>
                    <div className="text-sm text-gray-600">Klinik Mitra</div>
                  </div>
                </div>
              </div>

              {/* Updates Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Update Terbaru</h2>
                <div className="space-y-4">
                  {dummyProject.updates.map((update) => (
                    <div
                      key={update.id}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <div className="text-sm text-gray-500">{update.date}</div>
                      <h3 className="font-medium">{update.title}</h3>
                      <p className="text-sm text-gray-600">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Donors */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Donatur Terbaru</h2>
                <div className="space-y-4">
                  {dummyProject.donors.map((donor) => (
                    <div
                      key={donor.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{donor.name}</div>
                        <div className="text-sm text-gray-500">
                          {donor.date}
                        </div>
                      </div>
                      <div className="text-blue-600 font-medium">
                        {donor.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Sidebar */}
            <div className="md:w-80">
              <div className="bg-white border rounded-lg p-6 sticky top-4">
                {!showDonationForm ? (
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setShowDonationForm(true)}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Heart size={20} />
                      Donasi Sekarang
                    </button>
                    <button
                      onClick={() =>
                        router.push(
                          `/volunteers/register?project=${dummyProject.id}`
                        )
                      }
                      className="w-full border border-blue-600 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50"
                    >
                      Jadi Relawan
                    </button>
                    <button className="w-full border px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <Share2 size={20} />
                      Bagikan
                    </button>

                    <hr className="my-4" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Mulai: {dummyProject.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>Berakhir: {dummyProject.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span>{dummyProject.volunteers} relawan bergabung</span>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div>
                      <h3 className="font-medium mb-2">
                        Diselenggarakan oleh:
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {dummyProject.organizer}
                            </div>
                            <div className="text-sm text-gray-500">
                              Verified Organization
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Donation Form
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-900 mb-4">
                        Pilih Nominal Donasi
                      </label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {donationAmounts.map(({ value, label }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setDonationAmount(value.toString())}
                            className={`p-4 border rounded-lg text-center hover:border-blue-500 transition-colors
                              ${
                                donationAmount === value.toString()
                                  ? "border-blue-500 bg-blue-50 text-blue-600"
                                  : "border-gray-300"
                              }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <div className="relative mt-4">
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          placeholder="Nominal lain"
                          className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                          Rp
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-900 mb-4">
                        Pilih Metode Pembayaran
                      </label>
                      <div className="space-y-3">
                        <label
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                            paymentMethod === "card"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <CreditCard size={24} className="text-blue-600" />
                            <div>
                              <div className="font-medium">
                                Kartu Kredit/Debit
                              </div>
                              <div className="text-sm text-gray-500">
                                Visa, Mastercard, JCB
                              </div>
                            </div>
                          </div>
                        </label>

                        <label
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                            paymentMethod === "ewallet"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="ewallet"
                            checked={paymentMethod === "ewallet"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <Wallet size={24} className="text-blue-600" />
                            <div>
                              <div className="font-medium">E-Wallet</div>
                              <div className="text-sm text-gray-500">
                                GoPay, OVO, DANA, LinkAja
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          "Memproses..."
                        ) : (
                          <>
                            <Heart size={20} />
                            Lanjutkan Pembayaran
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDonationForm(false)}
                        className="w-full text-gray-600 hover:text-gray-900"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
