"use client"

import { CameraDebug } from "@/components/camera-debug"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CameraTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">Camera Troubleshooting</h1>

          <CameraDebug />

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Common Issues & Solutions</h2>

            <div className="space-y-4 text-sm">
              <div>
                <strong>Camera not working:</strong>
                <ul className="list-disc list-inside ml-4 text-gray-600">
                  <li>Make sure you've granted camera permissions</li>
                  <li>Check if another app is using the camera</li>
                  <li>Try refreshing the page</li>
                  <li>Ensure you're using HTTPS (required for camera access)</li>
                </ul>
              </div>

              <div>
                <strong>Photo capture fails:</strong>
                <ul className="list-disc list-inside ml-4 text-gray-600">
                  <li>Wait for the "Camera Ready" indicator</li>
                  <li>Make sure the video is fully loaded</li>
                  <li>Try switching to upload mode instead</li>
                </ul>
              </div>

              <div>
                <strong>Browser compatibility:</strong>
                <ul className="list-disc list-inside ml-4 text-gray-600">
                  <li>Chrome, Firefox, Safari, and Edge are supported</li>
                  <li>Some older browsers may not support camera access</li>
                  <li>Mobile browsers generally work well</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
