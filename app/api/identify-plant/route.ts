import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Get API key from environment variables
    const apiKey = "wWp0XW1HI5bSGK41Awfd1LIkjZ9Nuwg2fp0fGiY6XXvLNDobdv"


    // Plant.id API endpoint - using v3
    const apiUrl = "https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,best_light_condition,best_soil_type,common_uses,cultural_significance,toxicity,best_watering"

    // Prepare the request body according to Plant.id API v3 format
    const requestBody = {
      images: body.images,
      "latitude": 28.7041,
      "longitude": 77.1025,
      "similar_images": true
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    console.log("Plant.id API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Plant.id API error details:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })

      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "Invalid or missing Plant.id API key. Please check your API key configuration.",
            details: errorText,
          },
          { status: 401 },
        )
      }

      return NextResponse.json(
        {
          error: `Plant.id API error: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Plant.id API response received successfully")

    return NextResponse.json(data)
  } catch (error) {
    console.error("Plant identification error:", error)
    return NextResponse.json(
      {
        error: "Failed to identify plant. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
