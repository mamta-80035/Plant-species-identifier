"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, Sparkles, Zap, Shield, Users, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AnimatedCounter } from "@/components/ui"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Header with Logo */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Image
                  src="/plant-logo.png"
                  alt="Plant Species Identifier Logo"
                  width={80}
                  height={80}
                  className="animate-pulse-slow"
                />
                
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Plant Species Identifier
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the world of plants with AI-powered identification. Simply snap a photo or upload an image to
              unlock detailed information about any plant species.
            </p>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <AnimatedCounter end={50000} suffix="+" />
              <p className="text-gray-600 mt-2">Species Database</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <AnimatedCounter end={98} suffix="%" />
              <p className="text-gray-600 mt-2">Accuracy Rate</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <AnimatedCounter end={1000000} suffix="+" />
              <p className="text-gray-600 mt-2">Plants Identified</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <AnimatedCounter end={24} suffix="/7" />
              <p className="text-gray-600 mt-2">Available</p>
            </div>
          </div>

          {/* Main Action Cards */}
          <div
            className={`max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Camera Card */}
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-gray-800 mb-2">Take Photo</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Use your camera to capture any plant in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <Link href="/identify?mode=camera">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Open Camera
                      <Sparkles className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Upload Card */}
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <Upload className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-gray-800 mb-2">Upload Image</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Choose an existing photo from your device gallery
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <Link href="/identify?mode=upload">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Select Photo
                      <Sparkles className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div
            className={`max-w-6xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
              <p className="text-xl text-gray-600">Advanced AI technology meets botanical expertise</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant results with our optimized AI algorithms that process images in seconds
                </p>
              </div>

              <div className="text-center group">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Highly Accurate</h3>
                <p className="text-gray-600 leading-relaxed">
                  98% accuracy rate powered by machine learning and extensive botanical databases
                </p>
              </div>

              <div className="text-center group">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">Expert Verified</h3>
                <p className="text-gray-600 leading-relaxed">
                  All plant data is verified by botanical experts and continuously updated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
