'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Define the Donation type
type Donation = {
  id: string;
  amount: number;
  status: string;
  project: {
    name: string;
    id: string;
  };
};

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const router = useRouter();
  
  // Get the current user session
  useEffect(() => {
    const getUserDonations = async () => {
      try {
        // Assuming the logged-in user's ID is available
        const response = await axios.get('/api/donations', {
          params: {
            userId: 'CURRENT_USER_ID', // Replace with actual user ID from session
            page,
            limit,
          },
        });
        setDonations(response.data.donations);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    getUserDonations();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleAddDonation = () => {
    router.push('/projects');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Donations</h1>

      {/* Donations List */}
      <div className="space-y-4">
        {donations.map(donation => (
          <div key={donation.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Project: {donation.project.name}</p>
                <p>Status: {donation.status}</p>
              </div>
              <div>
                <p>Amount: ${donation.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Previous
        </button>
        <span>
          Page {page} of {pagination.totalPages}
        </span>
        <button
          disabled={page >= pagination.totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Next
        </button>
      </div>

      <div className="mt-4 flex gap-4">
      <button
        onClick={handleAddDonation}
        className="flex-1 p-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add Donation
      </button>
      <button
        onClick={() => router.push('/payment/history/')}
        className="flex-1 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        View Payment History
      </button>
    </div>
    </div>
  );
}
