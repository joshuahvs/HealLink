'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Partnership = {
  id: string;
  amount: number;
  startDate: string;
  endDate?: string;
  status: 'ONREVIEW' | 'ACTIVE' | 'COMPLETED';
  brandRepresented?: string;
  industryCategory?: string;
  objective?: string;
  company: {
    id: string;
    name: string;
    email: string;
    logoUrl?: string;
  };
  project: {
    id: string;
    title: string;
  };
};

export default function ManagePartnershipsPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPartnerships = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/companies/admin');
      setPartnerships(res.data.filter((p: Partnership) => p.status === 'ONREVIEW'));
    } catch (error) {
      console.error('Failed to fetch partnerships:', error);
    } finally {
      setLoading(false);
    }
  };

  const approvePartnership = async (partnershipId: string) => {
    try {
      await axios.put('/api/companies/admin', {
        partnershipId,
        status: 'ACTIVE'
      });
      setPartnerships((prev) => prev.filter((p) => p.id !== partnershipId));
    } catch (error) {
      console.error('Failed to approve partnership:', error);
    }
  };

  useEffect(() => {
    fetchPartnerships();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Partnership Requests</h1>

      {loading ? (
        <p>Loading...</p>
      ) : partnerships.length === 0 ? (
        <p className="text-gray-500">No pending partnerships.</p>
      ) : (
        <div className="space-y-4">
          {partnerships.map((partnership) => (
            <div
              key={partnership.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
            >
              <div>
                <h2 className="font-semibold">{partnership.company.name}</h2>
                <p className="text-sm text-gray-500">
                  Brand: {partnership.brandRepresented || '-'} | Project: {partnership.project.title}
                </p>
                <p className="text-sm text-gray-500">Amount: Rp {partnership.amount.toLocaleString()}</p>
              </div>
              <button
                onClick={() => approvePartnership(partnership.id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                ✔ Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
