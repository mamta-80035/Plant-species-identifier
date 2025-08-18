"use client"

import { Drawer } from "vaul"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

interface PlantDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  plant: any
  selectedImage: string
}

export function PlantDetailsDrawer({ isOpen, onClose, plant, selectedImage }: PlantDetailsDrawerProps) {
  if (!plant) return null

  return (
    <Drawer.Root open={isOpen} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{plant.name}</h2>
                {plant.details?.common_names && plant.details.common_names.length > 0 && (
                  <p className="text-gray-600 mt-1">
                    <strong>Common names:</strong> {plant.details.common_names.join(", ")}
                  </p>
                )}
              </div>
              <Button onClick={onClose} variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Plant Image */}
            <div className="mb-6">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={plant.name}
                width={400}
                height={300}
                className="rounded-lg mx-auto object-cover w-full max-w-sm"
              />
            </div>

            {/* Confidence Score */}
            <div className="mb-6 text-center">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                {Math.round(plant.probability * 100)}% match
              </span>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {/* Taxonomy */}
              {plant.details?.taxonomy && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">🔬 Scientific Classification</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>Kingdom:</strong> {plant.details.taxonomy.kingdom}
                    </div>
                    <div>
                      <strong>Family:</strong> {plant.details.taxonomy.family}
                    </div>
                    <div>
                      <strong>Genus:</strong> {plant.details.taxonomy.genus}
                    </div>
                    <div>
                      <strong>Class:</strong> {plant.details.taxonomy.class}
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              {plant.details?.description?.value && (
                <div>
                  <h4 className="font-semibold mb-3">📖 Description</h4>
                  <p className="text-gray-700 text-sm leading-relaxed bg-white p-3 rounded-lg shadow-sm">
                    {plant.details.description.value}
                  </p>
                </div>
              )}

              {/* Care Information Grid */}
              <div className="grid grid-cols-1 gap-4">
                {plant.details?.best_watering && (
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold mb-2 text-blue-800">💧 Watering Requirements</h4>
                    <p className="text-sm text-blue-700">{plant.details.best_watering}</p>
                  </div>
                )}

                {plant.details?.best_light_condition && (
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-semibold mb-2 text-yellow-800">☀️ Light Requirements</h4>
                    <p className="text-sm text-yellow-700">{plant.details.best_light_condition}</p>
                  </div>
                )}

                {plant.details?.best_soil_type && (
                  <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                    <h4 className="font-semibold mb-2 text-amber-800">🌱 Soil Requirements</h4>
                    <p className="text-sm text-amber-700">{plant.details.best_soil_type}</p>
                  </div>
                )}

                {plant.details?.common_uses && (
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold mb-2 text-green-800">🔧 Common Uses</h4>
                    <p className="text-sm text-green-700">{plant.details.common_uses}</p>
                  </div>
                )}
              </div>

              {/* Cultural Significance */}
              {plant.details?.cultural_significance && (
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold mb-2 text-purple-800">🏛️ Cultural Significance</h4>
                  <p className="text-sm text-purple-700 leading-relaxed">{plant.details.cultural_significance}</p>
                </div>
              )}

              {/* Edible Parts */}
              {plant.details?.edible_parts && plant.details.edible_parts.length > 0 && (
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                  <h4 className="font-semibold mb-3 text-orange-800">🍃 Edible Parts</h4>
                  <div className="flex flex-wrap gap-2">
                    {plant.details.edible_parts.map((part: string, partIndex: number) => (
                      <span key={partIndex} className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Toxicity Warning */}
              {plant.details?.toxicity && (
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold mb-2 text-red-800">⚠️ Toxicity Information</h4>
                  <p className="text-sm text-red-700 leading-relaxed">{plant.details.toxicity}</p>
                </div>
              )}

              {/* Similar Images */}
              {plant.similar_images && plant.similar_images.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">📸 Similar Images</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {plant.similar_images.slice(0, 6).map((similarImage: any, imgIndex: number) => (
                      <div key={imgIndex} className="relative rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={similarImage.url || "/placeholder.svg"}
                          alt={`Similar plant ${imgIndex + 1}`}
                          width={120}
                          height={90}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/75 text-white px-2 py-1 rounded text-xs font-medium">
                          {Math.round(similarImage.similarity * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                {plant.details?.url && (
                  <a
                    href={plant.details.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    📖 Wikipedia
                  </a>
                )}
                {plant.details?.gbif_id && (
                  <a
                    href={`https://www.gbif.org/species/${plant.details.gbif_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 hover:text-red-800 text-sm bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    🔬 GBIF Database
                  </a>
                )}
                {plant.details?.inaturalist_id && (
                  <a
                    href={`https://www.inaturalist.org/taxa/${plant.details.inaturalist_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-800 text-sm bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    🌿 iNaturalist
                  </a>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
