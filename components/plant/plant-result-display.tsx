"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, RotateCcw, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PlantResultDisplayProps {
  selectedImage: string
  result: any
  onResetIdentification: () => void
}

export function PlantResultDisplay({ selectedImage, result, onResetIdentification }: PlantResultDisplayProps) {
  return (
    <div className="w-full px-2 sm:px-4">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden w-full max-w-6xl mx-auto">
        <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">🌿 Plant Identified!</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <div className="relative group">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Identified plant"
                width={400}
                height={300}
                className="rounded-2xl mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300 max-w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Plant Confidence */}
          {result.result?.is_plant && (
            <div className="mb-8 text-center">
              <Badge className="bg-green-100 text-green-800 px-6 py-2 text-lg font-semibold rounded-full">
                {Math.round(result.result.is_plant.probability * 100)}% confident this is a plant
              </Badge>
            </div>
          )}

          {result.result?.classification?.suggestions && result.result.classification.suggestions.length > 0 && (
            <div className="space-y-8">
              {result.result.classification.suggestions.slice(0, 3).map((suggestion: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border"
                >
                  {/* Plant Name and Probability */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-2xl sm:text-3xl text-gray-800 mb-2">{suggestion.name}</h3>
                      {suggestion.details?.common_names && suggestion.details.common_names.length > 0 && (
                        <p className="text-gray-600 text-base sm:text-lg">
                          <strong>Common names:</strong> {suggestion.details.common_names.join(", ")}
                        </p>
                      )}
                    </div>
                    <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg font-semibold rounded-xl self-start">
                      {Math.round(suggestion.probability * 100)}% match
                    </Badge>
                  </div>

                  {/* Taxonomy */}
                  {suggestion.details?.taxonomy && (
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-6">
                      <h4 className="font-semibold text-xl mb-4 text-gray-800">🔬 Scientific Classification</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <strong className="text-gray-700">Kingdom:</strong>
                          <p className="text-gray-600">{suggestion.details.taxonomy.kingdom}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <strong className="text-gray-700">Family:</strong>
                          <p className="text-gray-600">{suggestion.details.taxonomy.family}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <strong className="text-gray-700">Genus:</strong>
                          <p className="text-gray-600">{suggestion.details.taxonomy.genus}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <strong className="text-gray-700">Class:</strong>
                          <p className="text-gray-600">{suggestion.details.taxonomy.class}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {suggestion.details?.description?.value && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-xl mb-3 text-gray-800">📖 Description</h4>
                      <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-xl shadow-sm">
                        {suggestion.details.description.value}
                      </p>
                    </div>
                  )}

                  {/* Care Information Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {suggestion.details?.best_watering && (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500">
                        <h4 className="font-semibold text-lg mb-3 text-blue-800 flex items-center">
                          💧 Watering Requirements
                        </h4>
                        <p className="text-blue-700 text-sm sm:text-base">{suggestion.details.best_watering}</p>
                      </div>
                    )}

                    {suggestion.details?.best_light_condition && (
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 sm:p-6 rounded-xl border-l-4 border-yellow-500">
                        <h4 className="font-semibold text-lg mb-3 text-yellow-800 flex items-center">
                          ☀️ Light Requirements
                        </h4>
                        <p className="text-yellow-700 text-sm sm:text-base">
                          {suggestion.details.best_light_condition}
                        </p>
                      </div>
                    )}

                    {suggestion.details?.best_soil_type && (
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 sm:p-6 rounded-xl border-l-4 border-amber-500">
                        <h4 className="font-semibold text-lg mb-3 text-amber-800 flex items-center">
                          🌱 Soil Requirements
                        </h4>
                        <p className="text-amber-700 text-sm sm:text-base">{suggestion.details.best_soil_type}</p>
                      </div>
                    )}

                    {suggestion.details?.common_uses && (
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border-l-4 border-green-500">
                        <h4 className="font-semibold text-lg mb-3 text-green-800 flex items-center">🔧 Common Uses</h4>
                        <p className="text-green-700 text-sm sm:text-base">{suggestion.details.common_uses}</p>
                      </div>
                    )}
                  </div>

                  {/* Special Information */}
                  {(suggestion.details?.edible_parts?.length > 0 ||
                    suggestion.details?.toxicity ||
                    suggestion.details?.cultural_significance) && (
                    <div className="space-y-4 mb-6">
                      {suggestion.details?.edible_parts && suggestion.details.edible_parts.length > 0 && (
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 rounded-xl border-l-4 border-orange-500">
                          <h4 className="font-semibold text-lg mb-3 text-orange-800">🍃 Edible Parts</h4>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.details.edible_parts.map((part: string, partIndex: number) => (
                              <Badge key={partIndex} className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full">
                                {part}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {suggestion.details?.toxicity && (
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 sm:p-6 rounded-xl border-l-4 border-red-500">
                          <h4 className="font-semibold text-lg mb-3 text-red-800">⚠️ Toxicity Information</h4>
                          <p className="text-red-700 leading-relaxed text-sm sm:text-base">
                            {suggestion.details.toxicity}
                          </p>
                        </div>
                      )}

                      {suggestion.details?.cultural_significance && (
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl border-l-4 border-purple-500">
                          <h4 className="font-semibold text-lg mb-3 text-purple-800">🏛️ Cultural Significance</h4>
                          <p className="text-purple-700 leading-relaxed text-sm sm:text-base">
                            {suggestion.details.cultural_significance}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Similar Images */}
                  {suggestion.similar_images && suggestion.similar_images.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-xl mb-4 text-gray-800">📸 Similar Images</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {suggestion.similar_images.slice(0, 6).map((similarImage: any, imgIndex: number) => (
                          <div key={imgIndex} className="relative rounded-xl overflow-hidden shadow-lg group">
                            <Image
                              src={similarImage.url || "/placeholder.svg"}
                              alt={`Similar plant ${imgIndex + 1}`}
                              width={200}
                              height={150}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded-lg text-sm font-medium">
                              {Math.round(similarImage.similarity * 100)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* External Links */}
                  <div className="flex flex-wrap gap-3">
                    {suggestion.details?.url && (
                      <a
                        href={suggestion.details.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-3 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
                      >
                        📖 Wikipedia
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    )}
                    {suggestion.details?.gbif_id && (
                      <a
                        href={`https://www.gbif.org/species/${suggestion.details.gbif_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-3 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
                      >
                        🔬 GBIF Database
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    )}
                    {suggestion.details?.inaturalist_id && (
                      <a
                        href={`https://www.inaturalist.org/taxa/${suggestion.details.inaturalist_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-4 py-3 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
                      >
                        🌿 iNaturalist
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    )}
                  </div>

                  {index < result.result.classification.suggestions.slice(0, 3).length - 1 && (
                    <Separator className="mt-8" />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onResetIdentification}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Identify Another Plant
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl transition-all duration-300 bg-transparent"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
