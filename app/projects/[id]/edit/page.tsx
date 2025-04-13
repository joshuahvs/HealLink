"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react"; // Changed from useSession to getSession
import { useParams, useRouter } from "next/navigation";
import { FieldError, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function EditProjectPage() {
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  // Watch the image URL for preview
  const imageUrl = watch("imageUrl");
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            router.push("/projects");
            return;
          }
          throw new Error("Failed to fetch project");
        }
        
        const project = await response.json();
        
        // Format the dates for the input fields
        const formattedProject = {
          ...project,
          startDate: project.startDate ? new Date(project.startDate).toISOString().split("T")[0] : "",
          endDate: project.endDate ? new Date(project.endDate).toISOString().split("T")[0] : "",
        };
        
        reset(formattedProject);
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project data");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProject();
    }
  }, [id, reset, router]);
  
  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update project");
      }
      
      toast.success("Project updated successfully!");
      router.push(`/projects/${id}`);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error(error.message || "Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageUpload = (url: any) => {
    setValue("imageUrl", url);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner" /> {/* Replace with a simple loading spinner */}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => router.push(`/projects/${id}`)}
            className="text-blue-600 hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Project
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800">Edit Project</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image
              </label>
              {/* Use a simple file input instead of custom ImageUpload */}
              <input 
                type="file" 
                {...register("imageUrl")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
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
                {errors.name && typeof errors.name === "object" && "message" in errors.name && (
                    <p className="mt-1 text-sm text-red-600">{(errors.name as FieldError).message}</p>
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
                {errors.description && typeof errors.description === "object" && "message" in errors.description && (
                    <p className="mt-1 text-sm text-red-600">{(errors.description as FieldError).message}</p>
                )}
            </div>

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
                {errors.targetAmount && typeof errors.targetAmount === "object" && "message" in errors.targetAmount && (
                <p className="mt-1 text-sm text-red-600">{(errors.targetAmount as FieldError).message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Amount (USD) *
                </label>
                <input
                type="number"
                step="0.01"
                min="0"
                {...register("currentAmount", { required: "Current amount is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.currentAmount && typeof errors.currentAmount === "object" && "message" in errors.currentAmount && (
                <p className="mt-1 text-sm text-red-600">{(errors.currentAmount as FieldError).message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
                </label>
                <input
                type="date"
                {...register("startDate", { required: "Start date is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.startDate && typeof errors.startDate === "object" && "message" in errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{(errors.startDate as FieldError).message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
                </label>
                <input
                type="date"
                {...register("endDate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.endDate && typeof errors.endDate === "object" && "message" in errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{(errors.endDate as FieldError).message}</p>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="0.0001"
                {...register("latitude")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="0.0001"
                {...register("longitude")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={() => router.push(`/projects/${id}`)} 
              disabled={isSubmitting} 
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !watch("name") || !watch("description") || !watch("targetAmount")} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
