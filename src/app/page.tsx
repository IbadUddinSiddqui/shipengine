"use client"
// pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [carriers, setCarriers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetCarriers = async () => {
    try {
      const res = await fetch("/api/getCarriers");

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Failed to fetch carriers");
        return;
      }

      const data = await res.json();
      setCarriers(data);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching carriers.");
    }
  };

  return (
    <div>
      <h1>ShipEngine Carrier List</h1>
      <button onClick={handleGetCarriers}>Fetch Carriers</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {carriers && (
        <div>
          <h2>Carriers List:</h2>
          <pre>{JSON.stringify(carriers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
