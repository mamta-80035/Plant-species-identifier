import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, Leaf } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">PlantID</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Identify any plant species instantly using advanced AI technology. Simply upload a photo or take a picture
            to discover the plant's name, characteristics, and care instructions.
          </p>
        </div>

        {/* Main CTAs */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Upload Image Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Upload Image</CardTitle>
                <CardDescription className="text-gray-600">Choose a photo from your device gallery</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/identify?mode=upload">
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    Select Photo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Take Photo Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Take Photo</CardTitle>
                <CardDescription className="text-gray-600">Use your camera to capture a plant</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/identify?mode=camera">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    Open Camera
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Why Choose PlantID?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Accurate Identification</h3>
                <p className="text-gray-600 text-sm">Advanced AI technology with high accuracy rates</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Easy to Use</h3>
                <p className="text-gray-600 text-sm">Simple interface for quick plant identification</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Multiple Options</h3>
                <p className="text-gray-600 text-sm">Upload existing photos or take new ones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
