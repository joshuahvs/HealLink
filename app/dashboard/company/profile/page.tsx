"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { AlertCircle, ArrowLeft, Upload, Check } from "lucide-react";
import Image from 'next/image';

export default function CompanyProfileForm() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    logoUrl: "",
    contactName: "",
    contactPhone: "",
    userId: ""
  });

  // Fetch session on component mount
  useEffect(() => {
    async function loadSession() {
      const sessionData = await getSession();
      setSession(sessionData);
      
      if (sessionData && sessionData.user) {
        // Pre-fill with user data if available
        setFormData(prev => ({
          ...prev,
          name: sessionData.user.name || "",
          email: sessionData.user.email || "",
          userId: sessionData.user.id || ""
        }));
      }
      
      setLoading(false);
    }
    
    loadSession();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register company profile');
      }
      
      // Success
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard/company');
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle file upload for logo (simplified - would need to integrate with your actual upload service)
  const handleLogoUpload = (e) => {
    // In a real implementation, you would upload the file to a storage service
    // and then set the returned URL in the form data
    // This is a simplified version that just sets a placeholder
    setFormData(prev => ({
      ...prev,
      logoUrl: "https://example.com/logo-placeholder.png"
    }));
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600">HealLink</span>
            </Link>
          </div>
          <div>
            <Link href="/dashboard/company" className="text-blue-600 hover:underline text-sm flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-xl font-semibold mb-2">Lengkapi Profil Perusahaan</h1>
            <p className="text-gray-500 mb-6">Isi data perusahaan Anda untuk memulai kemitraan CSR dengan HealLink</p>
            
            {error && (
              <div className="mb-6 bg-red-50 p-4 rounded-md border border-red-200">
                <div className="flex items-start space-x-2">
                  <AlertCircle size={18} className="text-red-500" />
                  <div>
                    <h3 className="font-medium text-red-800">Terjadi kesalahan</h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 p-4 rounded-md border border-green-200">
                <div className="flex items-start space-x-2">
                  <Check size={18} className="text-green-500" />
                  <div>
                    <h3 className="font-medium text-green-800">Profil berhasil disimpan</h3>
                    <p className="text-sm text-green-700">Anda akan dialihkan ke dashboard dalam beberapa saat.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700" 
                  />
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Perusahaan *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kontak Person *</label>
                  <input 
                    type="text" 
                    name="contactName" 
                    value={formData.contactName} 
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon Kontak Person *</label>
                  <input 
                    type="tel" 
                    name="contactPhone" 
                    value={formData.contactPhone} 
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo Perusahaan *</label>
                  <input 
                    type="file" 
                    name="logo"
                    onChange={handleLogoUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  />
                  {formData.logoUrl && (
                    <div className="mt-2">
                      <Image
                          src={formData.logoUrl}
                          alt="Logo Perusahaan"
                          width={128} 
                          height={128} 
                          className="object-cover"
                        />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className={`${
                    submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-semibold py-2 px-6 rounded-md focus:outline-none`}
                >
                  {submitting ? 'Sedang Menyimpan...' : 'Simpan Profil'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
