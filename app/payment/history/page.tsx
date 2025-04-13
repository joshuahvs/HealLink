'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Payment = {
  id: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: string;
  createdAt: string;
  donation?: {
    project?: {
      id: string;
      name: string;
    };
  };
};

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('/api/payment-history', {
          params: { page, limit: 10 },
        });
        setPayments(res.data.payments);
        setPagination(res.data.pagination);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPayments();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Payment History</h1>
      
      <div className="space-y-4">
        {payments.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Project: {p.donation?.project?.name || 'N/A'}</p>
                <p>Transaction ID: {p.transactionId}</p>
                <p>Status: {p.status}</p>
                <p>Payment Method: {p.paymentMethod}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${p.amount}</p>
                <p className="text-sm text-gray-500">
                  {new Date(p.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Previous
        </button>
        <span>
          Page {page} of {pagination.totalPages}
        </span>
        <button
          disabled={page >= pagination.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
