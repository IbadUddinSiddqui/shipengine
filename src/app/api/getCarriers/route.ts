import { NextResponse } from "next/server";
import ShipEngine from "shipengine";

// Initialize ShipEngine with your API key
const shipengine = new ShipEngine("TEST_HJ+RdJAeiEaGKT6dehj5r2GFjvJUCcvgkHmITljNx8o");

export async function GET(): Promise<NextResponse> {
  try {
    // Fetch the list of carriers
    const result = await shipengine.listCarriers();

    // Return the list of carriers as a JSON response
    return NextResponse.json(
      {
        success: true,
        carriers: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error listing carriers:", (error as Error).message);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        error: "Failed to list carriers",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
