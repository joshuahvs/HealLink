"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  location: string;
  currentAmount: number;
  targetAmount: number;
  imageUrl?: string;
};

export default function ProjectDetailPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [session, setSession] = useState<any>(null);  // you can adjust this type if needed

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push("/projects");
            return;
          }
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (!project) return null;

  const progress = (project.currentAmount / project.targetAmount) * 100;

  const tabs = ["Overview", "Impact", "Volunteers", "Donors", "Partners"];

  const isModerator = session?.user?.role === "MODERATOR";
  const isCompany = session?.user?.role === "COMPANY";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/projects")}
        className="text-blue-600 hover:underline mb-4 flex items-center"
      >
        ← Back to Projects
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {project.imageUrl && (
          <img src={project.imageUrl} alt={project.name} className="w-full h-64 object-cover" />
        )}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
              <p className="text-sm text-gray-600">{project.location}</p>
              <span
                className={`mt-2 inline-block text-xs px-3 py-1 rounded-full ${
                  project.status === "ONGOING"
                    ? "bg-green-100 text-green-800"
                    : project.status === "PLANNED"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {project.status}
              </span>
            </div>
            {isModerator && (
              <div className="space-x-2">
                <button
                  onClick={() => router.push(`/projects/${id}/edit`)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => router.push(`/projects/${id}/manage`)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Manage
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm">
            <div className="flex justify-between mb-1">
              <span>Raised: ${project.currentAmount.toLocaleString()}</span>
              <span>Goal: ${project.targetAmount.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-6 space-x-2">
            {session ? (
              <>
                {/* Hide Donate button for companies */}
                {!isModerator && !isCompany && (
                  <button
                  onClick={() => router.push(`/donations/add/${id}`)}  // Navigate to donations page
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Donate Now
                </button>
                
                )}

                {/* Show Volunteer button only for non-companies */}
                {!isModerator && !isCompany && (
                  <button
                    onClick={() => alert("Volunteer modal placeholder")}
                    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Volunteer
                  </button>
                )}

                {/* Show Partnership button only for companies */}
                {/* Show Partnership button only for companies */}
{isCompany && id && (
  <button
    onClick={() =>
      router.push(`/company/add/${id}`)  // Redirect to partnership form page with project ID
    }
    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
  >
    Partner with this Project
  </button>
)}
              </>
            ) : (
              <button
                onClick={() =>
                  router.push(
                    "/auth/signin?callbackUrl=" + encodeURIComponent(`/projects/${id}`)
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign in to Support
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex space-x-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-md p-4 border">
          {activeTab === "Overview" && <p>{project.description || "No overview available."}</p>}
          {activeTab === "Impact" && <p>Impact content here...</p>}
          {activeTab === "Volunteers" && <p>Volunteer list here...</p>}
          {activeTab === "Donors" && <p>Donation details...</p>}
          {activeTab === "Partners" && <p>Partnership info...</p>}
        </div>
      </div>
    </div>
  );
}
