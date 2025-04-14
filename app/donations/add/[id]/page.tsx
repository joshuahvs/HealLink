"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ArrowLeft,
  CreditCard,
  Wallet,
  Gift,
  AlertCircle,
} from "lucide-react";

// Dummy project data
const dummyProject = {
  id: 1,
  title: "Bantuan Medis Daerah Terpencil",
  description:
    "Program bantuan medis untuk masyarakat di daerah terpencil yang sulit mengakses layanan kesehatan.",
  location: "Nusa Tenggara Timur",
  targetAmount: "Rp 50.000.000",
  raisedAmount: "Rp 35.000.000",
  progress: 70,
  imageUrl:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800",
};

// Predefined donation amounts
const donationAmounts = [
  { value: 50000, label: "Rp 50.000" },
  { value: 100000, label: "Rp 100.000" },
  { value: 250000, label: "Rp 250.000" },
  { value: 500000, label: "Rp 500.000" },
  { value: 1000000, label: "Rp 1.000.000" },
];

export default function DonationFormPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    isAnonymous: false,
    message: "",
  });

  const handleAmountSelect = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.amount || parseInt(formData.amount) < 10000) {
      setError("Minimal donasi Rp 10.000");
      return;
    }

    if (!formData.paymentMethod) {
      setError("Pilih metode pembayaran");
      return;
    }

    // Dummy success - redirect to payment page
    router.push(`/payment/${dummyProject.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Kembali</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Project Info */}
          <div className="flex gap-4 mb-6">
            <img
              src={dummyProject.imageUrl}
              alt={dummyProject.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold mb-2">
                {dummyProject.title}
              </h1>
              <p className="text-gray-600 text-sm">
                {dummyProject.description}
              </p>
              <div className="mt-2 text-sm">
                <span className="font-medium">{dummyProject.raisedAmount}</span>
                <span className="text-gray-500">
                  {" "}
                  terkumpul dari target {dummyProject.targetAmount}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700 mb-6">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donation Amount */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Pilih Nominal Donasi
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {donationAmounts.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleAmountSelect(value)}
                    className={`p-4 border rounded-lg text-center hover:border-blue-500 transition-colors
                      ${
                        formData.amount === value.toString()
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
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Masukkan nominal lain"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                  Rp
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Pilih Metode Pembayaran
              </label>
              <div className="space-y-3">
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer
                  ${
                    formData.paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <CreditCard size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Kartu Kredit/Debit</div>
                      <div className="text-sm text-gray-500">
                        Visa, Mastercard, JCB
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer
                  ${
                    formData.paymentMethod === "ewallet"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ewallet"
                    checked={formData.paymentMethod === "ewallet"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <Wallet size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">E-Wallet</div>
                      <div className="text-sm text-gray-500">
                        GoPay, OVO, DANA, LinkAja
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer
                  ${
                    formData.paymentMethod === "transfer"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === "transfer"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <Gift size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Transfer Bank</div>
                      <div className="text-sm text-gray-500">
                        BCA, Mandiri, BNI, BRI
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  Sembunyikan nama saya (donasi anonim)
                </span>
              </label>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesan Dukungan (Opsional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tulis pesan dukungan anda..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Heart size={20} />
              Lanjutkan Pembayaran
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
