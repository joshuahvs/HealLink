'use client';

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { getSession } from "next-auth/react"; // Import getSession
import Link from "next/link"; // Import Link for navigation

const CompanyPage: NextPage = () => {
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // State to store userId
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetching session and partnerships
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true while fetching

      try {
        const session = await getSession(); // Fetch session on the client side

        if (session && session.user && session.user.id) {
          setUserId(session.user.id); // Set userId to state

          const partnershipsRes = await fetch(`/api/companies/partnerships?userId=${session.user.id}`);
          const partnershipsData = await partnershipsRes.json();
          setPartnerships(partnershipsData);
        }
      } catch (error) {
        console.error("Error fetching partnerships:", error);
      } finally {
        setLoading(false); // Set loading state to false once the fetching is done
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Company Dashboard</h1>

      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Debug output for userId */}
          {userId && <p className="text-gray-700">User ID: {userId}</p>}

          {/* Partnership Status Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Partnerships</h2>

            {/* Button to add a new partnership */}
            <div className="mb-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                <a href="/projects">Add Partnership</a>
              </button>
            </div>

            {/* List of partnerships based on status */}
            {partnerships.length === 0 ? (
              <p className="text-gray-500">No partnerships yet.</p>
            ) : (
              <ul className="space-y-4">
                {partnerships.map((partnership) => (
                  <Link key={partnership.id} href={`/projects/${partnership.project.id}/`}>
                    <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 cursor-pointer">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium text-gray-800">{partnership.company.name}</h3>
                        <p className="text-gray-700">Project: {partnership.project.name}</p>
                        <p className="text-gray-600">Status: 
                          <span className={
                            partnership.status === 'onreview' ? 'text-yellow-500' :
                            partnership.status === 'active' ? 'text-green-600' :
                            partnership.status === 'complete' ? 'text-gray-400' : ''
                          }>
                            {partnership.status === 'onreview' ? 'Under Review' :
                             partnership.status === 'active' ? 'Active' :
                             partnership.status === 'complete' ? 'Completed' : ''}
                          </span>
                        </p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyPage;
