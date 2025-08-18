"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PlantDetailsDrawer } from "./plant-details-drawer"

interface PlantResultsMobileProps {
  selectedImage: string
  result: any
  onResetIdentification: () => void
}

export function PlantResultsMobile({ selectedImage, result, onResetIdentification }: PlantResultsMobileProps) {
  const [selectedPlant, setSelectedPlant] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handlePlantSelect = (plant: any) => {
    setSelectedPlant(plant)
    setIsDrawerOpen(true)
  }

  return (
    <>
      <div className="w-full">
        <Card className="mx-4 md:mx-auto md:max-w-2xl border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
              <CardTitle className="text-center text-xl font-bold">🌿 Plant Identified!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Image
                src={selectedImage || "/plant-logo.png"}
                alt="Identified plant"
                width={400}
                height={300}
                className="rounded-lg mx-auto object-cover"
              />
            </div>

            {/* Plant Confidence */}
            {result.result?.is_plant && (
              <div className="mb-4 text-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {Math.round(result.result.is_plant.probability * 100)}% confident this is a plant
                </span>
              </div>
            )}

            {/* Plant Suggestions List */}
            {result.result?.classification?.suggestions && result.result.classification.suggestions.length > 0 && (
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-lg">Possible Matches:</h3>
                {result.result.classification.suggestions.slice(0, 5).map((suggestion: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handlePlantSelect(suggestion)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Plant Image */}
                      {suggestion.similar_images && suggestion.similar_images.length > 0 && (
                        <div className="flex-shrink-0">
                          <Image
                            src={suggestion.similar_images[0].url || "/plant-logo.png"}
                            alt={suggestion.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover w-15 h-15"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{suggestion.name}</h4>
                        {suggestion.details?.common_names && suggestion.details.common_names.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            {suggestion.details.common_names.slice(0, 2).join(", ")}
                          </p>
                        )}
                        <div className="mt-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {Math.round(suggestion.probability * 100)}% match
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center pt-6 border-t">
              <div className="flex flex-col gap-3">
                <Button onClick={onResetIdentification} className="w-full bg-green-600 hover:bg-green-700">
                  Identify Another Plant
                </Button>
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PlantDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        plant={selectedPlant}
        selectedImage={selectedImage}
      />
    </>
  )
}
