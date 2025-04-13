'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

type Project = {
  id: string;
  name: string;
  description: string;
  status: "PLANNED" | "ONGOING" | "COMPLETED";
  endDate: string | null;
};

type PartnershipRequest = {
  projectId: string;
  amount: number;
  startDate: string;
  endDate: string | null;
  brandRepresented: string;
  industryCategory: string;
  objective: string;
};

const AddPartnershipPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [brandRepresented, setBrandRepresented] = useState("");
  const [industryCategory, setIndustryCategory] = useState("");
  const [objective, setObjective] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [partnershipStatus, setPartnershipStatus] = useState<"active" | "on_reviewed" | "not_submitted">("not_submitted");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setProject(data);
          setStartDate(new Date().toISOString().split("T")[0]); // default to today
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setErrorMessage("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    const checkPartnershipStatus = async () => {
      if (id && session) {
        try {
          const res = await fetch(`/api/companies/partnerships`);
          const partnerships = await res.json();
          const existingPartnership = partnerships.find(
            (partnership: any) => partnership.projectId === id
          );

          if (existingPartnership) {
            setPartnershipStatus(existingPartnership.status);
          }
        } catch (error) {
          console.error("Error fetching partnership status:", error);
        }
      }
    };

    fetchProject();
    checkPartnershipStatus();
  }, [id, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !startDate || !brandRepresented || !industryCategory || !objective) {
      toast.error("All fields are required.");
      return;
    }

    if (project && project.status === "COMPLETED") {
      toast.error("You can only partner with PLANNED or ONGOING projects.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const startDateValid = new Date(startDate) >= new Date(today);
    const endDateValid = !endDate || (project?.endDate && new Date(endDate) <= new Date(project.endDate));

    if (!startDateValid) {
      toast.error("Start date cannot be before today.");
      return;
    }

    if (!endDateValid) {
      toast.error("End date cannot be after the project end date.");
      return;
    }

    const partnershipData: PartnershipRequest = {
      projectId: id as string,
      amount: parseFloat(amount),
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      brandRepresented,
      industryCategory,
      objective,
    };

    try {
      setSubmitting(true);
      const response = await fetch(`/api/companies/partnerships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partnershipData),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Partnership created successfully!");
        router.push(`/projects/${id}`);
      }
    } catch (error) {
      console.error("Error creating partnership:", error);
      toast.error("Failed to create partnership.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !session) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🤝 Create a Partnership</h1>

      {errorMessage && (
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded mb-6">
          {errorMessage}
        </div>
      )}

      {project ? (
        <div className="space-y-6 bg-white p-6 rounded shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
            <p className="text-gray-600 mb-1">{project.description}</p>
            <p className="text-sm text-gray-500">
              Status: <span className="font-medium">{project.status}</span> | Ends at:{" "}
              {project.endDate ? new Date(project.endDate).toLocaleDateString() : "N/A"}
            </p>
          </div>

          {partnershipStatus !== "not_submitted" && (
            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded">
              Partnership Status: <strong>{partnershipStatus === "active" ? "Active" : "On Review"}</strong>
            </div>
          )}

          {partnershipStatus === "not_submitted" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  💰 Amount to contribute
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  📅 Start Date (from today)
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  🛑 End Date (before project ends)
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="brandRepresented" className="block text-sm font-medium text-gray-700">
                  🏢 Brand Represented
                </label>
                <input
                  type="text"
                  id="brandRepresented"
                  value={brandRepresented}
                  onChange={(e) => setBrandRepresented(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="industryCategory" className="block text-sm font-medium text-gray-700">
                  🏭 Industry Category
                </label>
                <input
                  type="text"
                  id="industryCategory"
                  value={industryCategory}
                  onChange={(e) => setIndustryCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
                  🎯 Objective
                </label>
                <textarea
                  id="objective"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2 px-4 font-semibold rounded text-white transition ${
                  submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Partnership Request"}
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">Project not found.</div>
      )}
    </div>
  );
};

export default AddPartnershipPage;
