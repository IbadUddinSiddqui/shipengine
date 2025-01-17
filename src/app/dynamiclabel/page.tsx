"use client";
import Link from "next/link";
import { useState } from "react";
import { validateAddresses } from "shipengine/esm/validate-addresses";


export default function Home() {
  const [formData, setFormData] = useState({
    name: "Ibad Uddin",
          phone: "+1 444-444-4444",
          email: "recipient@example.com",
          address_line1: "350",
          city_locality: "Islamabad",
  state_province: "ICT",
  postal_code: "44000",
  country_code: "PK",
  address_residential_indicator: "yes",
    weight: 12,
    height: 12,
    width: 12,
    length: 12,
  });

  const [label, setLabel] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "weight" || name === "height" || name === "width" || name === "length" ? Number(value) : value,
    }));
  };

  const handleCreateLabel = async () => {
    const shipmentData = {
      shipment: {
        
   
        validate_address: "no_validation",
        service_code: "usps_priority_mail",
        ship_to: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address_line1: formData.address_line1,
          city_locality: formData.city_locality,
          state_province: formData.state_province,
          postal_code: formData.postal_code,
          country_code: formData.country_code,
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
              value: formData.weight,
              unit: "ounce",
            },
            dimensions: {
              height: 7,
              width: 12,
              length: 14,
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
      console.log(data,"response data")
      setLabel(data);
      setError(null);
    } catch (error) {
      setError("An error occurred while creating the label.");
    }
  };

  return (
    <div>
      <h1>Create Shipment Label</h1>
      <form>
        <h3>Recipient Information</h3>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="text" name="address_line1" placeholder="Address" value={formData.address_line1} onChange={handleInputChange} required />
        <input type="text" name="city_locality" placeholder="City" value={formData.city_locality} onChange={handleInputChange} required />
        <input type="text" name="state_province" placeholder="State" value={formData.state_province} onChange={handleInputChange} required />
        <input type="number" name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleInputChange} required />
        <input type="text" name="country_code" placeholder="Postal Code" value={formData.country_code} onChange={handleInputChange} required />

        <h3>Package Dimensions</h3>
        <input type="number" name="weight" placeholder="Weight (oz)" value={formData.weight} onChange={handleInputChange} required />
        <input type="number" name="height" placeholder="Height (in)" value={formData.height} onChange={handleInputChange} required />
        <input type="number" name="width" placeholder="Width (in)" value={formData.width} onChange={handleInputChange} required />
        <input type="number" name="length" placeholder="Length (in)" value={formData.length} onChange={handleInputChange} required />

        <button type="button" onClick={handleCreateLabel}>
          Create Label
        </button>
      </form>

      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
{console.log(label,"dynamic label data")}
      {label && (
        <div>
          <h2 className="text-black bg-blue-500">Customer Name: {label.ship_to.name}</h2>
          <h2 className="text-black bg-blue-500">Customer Phone: {label.ship_to.phone}</h2>
          <h2 className="text-black bg-blue-500">Track Your Order: {label.tracking_url}</h2>
          <Link href={label.label_download.pdf} className="text-black bg-blue-500">
            PDF Link
          </Link>
          <h2 className="text-black bg-blue-500">Package Id: {label.packages[0].package_id}</h2>
        </div>
      )}
    </div>
  );
}
