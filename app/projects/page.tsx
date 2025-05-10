"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  location: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", location: "" });
  const [sessionRole, setSessionRole] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const session = await getSession();
        if (!session) {
          router.push("/login"); // Redirect kalau belum login
          return;
        }
        setSessionRole(session.user?.role || null);
        fetchProjects(); // fetch project setelah session valid
      } catch (err) {
        console.error("Gagal mengambil session", err);
      }
    }

    fetchInitialData();
  }, [filters]); // jalankan ulang jika filter berubah

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.location) queryParams.append("location", filters.location);

      const response = await fetch(`/api/projects?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const isAdmin = sessionRole === "MODERATOR";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mobile Health Clinics</h1>
        {isAdmin && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/projects/create")}
          >
            Create New Project
          </button>
        )}
      </div>

      <div className="mb-6 flex gap-4">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Location</option>
          <option value="cityA">City A</option>
          <option value="cityB">City B</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">{project.status}</span>
                <span className="text-sm text-gray-500">{project.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
