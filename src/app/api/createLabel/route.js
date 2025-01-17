// app/api/createLabel/route.ts

export async function POST(req) {
  const apiUrl = "https://api.shipengine.com/v1/labels";
  const apiKey = "TEST_HJ+RdJAeiEaGKT6dehj5r2GFjvJUCcvgkHmITljNx8o";

  try {
    // Get the request body from the client (the shipment data)
    const shipmentData = await req.json();
console.log(shipmentData,"data check")
    // Make the API call to ShipEngine
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": apiKey,
      },
     
      body: JSON.stringify(shipmentData),  // Send the shipment data in the body
    });
console.log(response,"response")
    // If the response is not successful, return the error
    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify({ error }), { status: response.status });
    }

    // Get the label data from the response
    const label = await response.json();
console.log(label,"label ibad")
    // Return the label data to the client
    return new Response(JSON.stringify(label), { status: 200 });
  } catch (error) {
    // Handle any errors that might occur during the request
    return new Response(
      JSON.stringify({ error: "Internal Server Err", details: error.message }),
      { status: 500 }
    );
  }
}
