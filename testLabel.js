// Import required modules
import fetch from  'node-fetch'

const apiUrl = 'https://api.shipengine.com/v1/labels';  // ShipEngine API URL
const apiKey = 'TEST_HJ+RdJAeiEaGKT6dehj5r2GFjvJUCcvgkHmITljNx8o';  // Replace with your ShipEngine API key

// Define a minimal valid shipment payload
const testShipmentData = {
  shipment: {
      // Replace with your carrier ID
    service_code: 'ups_ground',  // Replace with your desired service code
    ship_to: {
      name: 'Jane Doe',
      phone: '+1 444-444-4444',
      email: 'recipient@example.com',
      address_line1: '525 S Winchester Blvd',
      city_locality: 'San Jose',
      state_province: 'CA',
      postal_code: '95128',
      country_code: 'US',
      address_residential_indicator: 'yes',
    },
    ship_from: {
      name: 'John Doe',
      company_name: 'Example Corp',
      phone: '+1 555-555-5555',
      email: 'sender@example.com',
      address_line1: '4301 Bull Creek Rd',
      city_locality: 'Austin',
      state_province: 'TX',
      postal_code: '78731',
      country_code: 'US',
      address_residential_indicator: 'no',
    },
    packages: [
      {
        weight: {
          value: 20,  // Package weight in ounces
          unit: 'ounce',  // Weight unit
        },
        dimensions: {
          height: 6,  // Height in inches
          width: 12,  // Width in inches
          length: 24,  // Length in inches
          unit: 'inch',  // Dimension unit
        },
      },
    ],
  },
};

// Function to test the ShipEngine API
async function testShipEngineLabelCreation() {
  try {
    // Make the POST request to the ShipEngine API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': apiKey,  // Set your ShipEngine API key here
      },
      body: JSON.stringify(testShipmentData),  // Send the shipment data
    });

    // Check if the response is OK (status code 200)
    if (response.ok) {
      const responseData = await response.json();
      console.log('Label Created Successfully:', responseData);
      // Optionally, log the label URL or other relevant data
      console.log('Label URL:', responseData.label_url);
    } else {
      const errorData = await response.json();  // Get the error response
      console.error('ShipEngine API Error:', errorData);
    }
  } catch (error) {
    console.error('Error during API request:', error);
  }
}

// Call the test function
testShipEngineLabelCreation();
