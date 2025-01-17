"use client"
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [label, setLabel] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateLabel = async () => {
    const shipmentData = {
      shipment: {
        
        service_code: "ups_ground",
        ship_to: {
          name: "Ibad Uddin",
          phone: "+1 444-444-4444",
          email: "recipient@example.com",
          address_line1: "525 S Winchester Blvd",
          city_locality: "San Jose",
          state_province: "CA",
          postal_code: "95128",
          country_code: "US",
          address_residential_indicator: "yes",
        },
        ship_from: {
          name: "John Doe",
          company_name: "Example Corp",
          phone: "+1 555-555-5555",
          email: "sender@example.com",
          address_line1: "4301 Bull Creek Rd",
          city_locality: "Austin",
          state_province: "TX",
          postal_code: "78731",
          country_code: "US",
          address_residential_indicator: "no",
        },
        packages: [
          {
            weight: {
              value: 20,
              unit: "ounce",
            },
            dimensions: {
              height: 6,
              width: 12,
              length: 24,
              unit: "inch",
            },
          },
        ],
      },
    };

    try {
      const res = await fetch("/api/createLabel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Failed to create label");
        return;
      }

      const data = await res.json();
      setLabel(data);
      setError(null);
    } catch (error) {
      setError("An error occurred while creating the label.");
    }
  };

  const renderLabel = (labelData: any) => {
    // Check if labelData contains errors or request_id
    if (labelData) {
      // Render errors if they exist
      if (labelData.errors) {
        return <pre>{JSON.stringify(labelData.errors, null, 2)}</pre>;
      }

      // Render request_id if it exists
      if (labelData.request_id) {
        return (
          <div>
            <h3>Label Generated</h3>
            <pre>{JSON.stringify(labelData, null, 2)}</pre>
          </div>
        );
      }
    }

    return <p>No label data found</p>;
  };
console.log("label",label);

  return (
    <div>
      <h1>Create Shipment Label</h1>
      <button onClick={handleCreateLabel}>Create Label</button>

      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

      {label && (
        <div>
          <h2 className="text-black bg-blue-500">Customer Name:{label.ship_to.name}</h2>
          <h2 className="text-black bg-blue-500">Customer Phone:{label.ship_to.phone}</h2>
          <h2 className="text-black bg-blue-500">Track Your Order:{label.tracking_url}</h2>
          <Link href={label.label_download.pdf} className="text-black bg-blue-500">PDF Link</Link>
          <h2 className="text-black bg-blue-500">Package Id:{ label.packages[0].package_id}</h2>
        </div>
      )}
    </div>
  );
}
