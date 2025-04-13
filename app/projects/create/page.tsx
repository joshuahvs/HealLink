// app/projects/create/page.tsx
"use client";

import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// Define types for form data
type FormData = {
  name: string;
  description: string;
  targetAmount: string;
  startDate: string;
  endDate: string;
  status: string;
  location: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
};

export default function CreateProjectPage() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      targetAmount: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "PLANNED",
      location: "",
      latitude: "",
      longitude: "",
      imageUrl: "",
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Get session with getSession
  const session = getSession();

  // Watch the image URL for preview
  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create project");
      }
      
      const project = await response.json();
      toast.success("Project created successfully!");
      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(error.message || "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => router.push("/projects")}
            className="text-blue-600 hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800">Create New Project</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image
              </label>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const url = URL.createObjectURL(e.target.files[0]);
                    setValue("imageUrl", url);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {imageUrl && <img src={imageUrl} alt="Project" className="mt-4" />}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                {...register("name", { required: "Project name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows={5}
                {...register("description", { required: "Description is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount (USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("targetAmount", { required: "Target amount is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.targetAmount && (
                  <p className="mt-1 text-sm text-red-600">{errors.targetAmount.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="PLANNED">Planned</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  {...register("startDate", { required: "Start date is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  {...register("endDate")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude (Optional)
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("latitude")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude (Optional)
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("longitude")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/projects")}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {isSubmitting ? "Creating..." : "Create Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}