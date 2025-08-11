"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface PlantResultDisplayProps {
  selectedImage: string
  result: any
  onResetIdentification: () => void
}

export function PlantResultDisplay({ selectedImage, result, onResetIdentification }: PlantResultDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Plant Identified!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Image
            src={selectedImage || "/placeholder.svg"}
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

        {result.result?.classification?.suggestions && result.result.classification.suggestions.length > 0 && (
          <div className="space-y-6">
            {result.result.classification.suggestions.slice(0, 3).map((suggestion: any, index: number) => (
              <div key={index} className="border rounded-lg p-6 space-y-4">
                {/* Plant Name and Probability */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{suggestion.name}</h3>
                    {suggestion.details?.common_names && suggestion.details.common_names.length > 0 && (
                      <p className="text-gray-600 mt-1">
                        <strong>Common names:</strong> {suggestion.details.common_names.join(", ")}
                      </p>
                    )}
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                    {Math.round(suggestion.probability * 100)}% match
                  </span>
                </div>

                {/* Taxonomy */}
                {suggestion.details?.taxonomy && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Scientific Classification</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>Kingdom:</strong> {suggestion.details.taxonomy.kingdom}
                      </div>
                      <div>
                        <strong>Family:</strong> {suggestion.details.taxonomy.family}
                      </div>
                      <div>
                        <strong>Genus:</strong> {suggestion.details.taxonomy.genus}
                      </div>
                      <div>
                        <strong>Class:</strong> {suggestion.details.taxonomy.class}
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {suggestion.details?.description?.value && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{suggestion.details.description.value}</p>
                  </div>
                )}

                {/* Edible Parts */}
                {suggestion.details?.edible_parts && suggestion.details.edible_parts.length > 0 && (
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                    <h4 className="font-semibold mb-2 text-orange-800 flex items-center">🍃 Edible Parts</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.details.edible_parts.map((part: string, partIndex: number) => (
                        <span key={partIndex} className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Toxicity Information */}
                {suggestion.details?.toxicity && (
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold mb-2 text-red-800 flex items-center">⚠️ Toxicity Information</h4>
                    <p className="text-sm text-red-700 leading-relaxed">{suggestion.details.toxicity}</p>
                  </div>
                )}

                {/* Cultural Significance */}
                {suggestion.details?.cultural_significance && (
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-semibold mb-2 text-purple-800 flex items-center">🏛️ Cultural Significance</h4>
                    <p className="text-sm text-purple-700 leading-relaxed">
                      {suggestion.details.cultural_significance}
                    </p>
                  </div>
                )}

                {/* Care Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Watering */}
                  {suggestion.details?.best_watering && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-800">💧 Watering</h4>
                      <p className="text-sm text-blue-700">{suggestion.details.best_watering}</p>
                    </div>
                  )}

                  {/* Light Conditions */}
                  {suggestion.details?.best_light_condition && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-yellow-800">☀️ Light Requirements</h4>
                      <p className="text-sm text-yellow-700">{suggestion.details.best_light_condition}</p>
                    </div>
                  )}

                  {/* Soil Type */}
                  {suggestion.details?.best_soil_type && (
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-amber-800">🌱 Soil Requirements</h4>
                      <p className="text-sm text-amber-700">{suggestion.details.best_soil_type}</p>
                    </div>
                  )}

                  {/* Common Uses */}
                  {suggestion.details?.common_uses && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-800">🔧 Common Uses</h4>
                      <p className="text-sm text-green-700">{suggestion.details.common_uses}</p>
                    </div>
                  )}
                </div>

                {/* Similar Images */}
                {suggestion.similar_images && suggestion.similar_images.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Similar Images</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {suggestion.similar_images.slice(0, 6).map((similarImage: any, imgIndex: number) => (
                        <div key={imgIndex} className="relative rounded-lg overflow-hidden">
                          <Image
                            src={similarImage.url || "/placeholder.svg"}
                            alt={`Similar plant ${imgIndex + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-24 object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                            {Math.round(similarImage.similarity * 100)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {suggestion.details?.url && (
                    <a
                      href={suggestion.details.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      📖 Wikipedia
                    </a>
                  )}
                  {suggestion.details?.gbif_id && (
                    <a
                      href={`https://www.gbif.org/species/${suggestion.details.gbif_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 hover:text-red-800 text-sm bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      🔬 GBIF Database
                    </a>
                  )}
                  {suggestion.details?.inaturalist_id && (
                    <a
                      href={`https://www.inaturalist.org/taxa/${suggestion.details.inaturalist_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-800 text-sm bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      🌿 iNaturalist
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8 pt-6 border-t">
          <Button onClick={onResetIdentification} className="mr-4 bg-green-600 hover:bg-green-700">
            Identify Another Plant
          </Button>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
