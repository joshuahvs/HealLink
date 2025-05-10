"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;

  useEffect(() => {
    // Fetch the project details based on the ID
    const fetchProjectDetails = async () => {
      if (!projectId) {
        setError("Project ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleCompletePayment = async () => {
    setProcessingPayment(true);
    
    try {
      // Simulate payment success
      setTimeout(() => {
        router.push("/donations?success=true"); // Redirect to donations page
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment processing failed");
      setProcessingPayment(false);
    }
  };
  

  if (loading) {
    return <div className="text-center p-8">Loading payment details...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-red-500 text-xl">Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
      
      {project && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Donation for: {project.name}</h2>
          {project.imageUrl && (
            <img 
              src={project.imageUrl} 
              alt={project.name} 
              className="w-full h-40 object-cover rounded-md mt-2"
            />
          )}
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Select Payment Method</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="CREDIT_CARD"
              checked={paymentMethod === "CREDIT_CARD"}
              onChange={() => setPaymentMethod("CREDIT_CARD")}
              className="h-4 w-4"
            />
            <span>Credit Card</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="BANK_TRANSFER"
              checked={paymentMethod === "BANK_TRANSFER"}
              onChange={() => setPaymentMethod("BANK_TRANSFER")}
              className="h-4 w-4"
            />
            <span>Bank Transfer</span>
          </label>
        </div>
      </div>
      
      {/* This would be a form with payment details in a real implementation */}
      
      <div className="mt-8">
        <button
          onClick={handleCompletePayment}
          disabled={processingPayment}
          className="w-full py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 disabled:bg-green-300"
        >
          {processingPayment ? "Processing..." : "Complete Payment"}
        </button>
        
        <button
          onClick={() => router.back()}
          disabled={processingPayment}
          className="w-full py-2 mt-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;