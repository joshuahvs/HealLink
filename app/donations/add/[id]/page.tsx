"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const AddDonation = () => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // Mengambil idproject dari URL params
  const params = useParams();
  const idproject = params.id;

  useEffect(() => {
    // Pastikan idproject ada sebelum melanjutkan proses lebih lanjut
    if (!idproject) {
      setError("Project ID is required.");
    }
  }, [idproject]);

  // Handle form submission to create donation
  const handleSubmit = async () => {
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!idproject) {
      alert("Project ID is missing.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, message, isAnonymous, projectId: idproject }),
      });

      if (!res.ok) {
        throw new Error("Failed to create donation.");
      }

      const donation = await res.json();
      
      // Setelah berhasil, arahkan ke halaman pembayaran dengan idproject
      router.push(`/payment/${idproject}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Donation</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter donation amount"
          />
        </label>
        <br />
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message (optional)"
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Donate Anonymously
        </label>
        <br />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Donation"}
        </button>
      </div>
    </div>
  );
};

export default AddDonation;