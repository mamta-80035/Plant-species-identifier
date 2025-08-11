"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [cameraStatus, setCameraStatus] = useState<string>("initializing")
  const [currentFacingMode, setCurrentFacingMode] = useState<"user" | "environment">("environment")
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      setIsMobile(mobile)
    }
    checkMobile()
  }, [])

  const getAvailableCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((device) => device.kind === "videoinput")
      setAvailableCameras(videoDevices)
      console.log("Available cameras:", videoDevices)

      // If we have multiple cameras and we're on mobile, prefer back camera
      if (videoDevices.length > 1 && isMobile) {
        const backCamera = videoDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear") ||
            device.label.toLowerCase().includes("environment"),
        )
        if (backCamera) {
          setCurrentFacingMode("environment")
        }
      }
    } catch (error) {
      console.error("Error getting camera devices:", error)
    }
  }

  const cleanupCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
        console.log("Stopped camera track:", track.kind)
      })
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsVideoReady(false)
    setCameraStatus("stopped")
  }, [stream])

  const startCamera = async (facingMode: "user" | "environment" = currentFacingMode) => {
    try {
      setCameraStatus("requesting_permission")
      console.log(`Starting camera with facing mode: ${facingMode}`)

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported in this browser")
      }

      cleanupCamera()
      setCameraStatus("getting_devices")
      setCurrentFacingMode(facingMode)
      setCameraStatus("requesting_stream")

      const constraints = [
        {
          video: {
            facingMode: { exact: facingMode },
            width: { ideal: isMobile ? 1280 : 1280, min: 640 },
            height: { ideal: isMobile ? 720 : 720, min: 480 },
            frameRate: { ideal: 30, min: 15 },
          },
        },
        {
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 640, min: 320 },
            height: { ideal: 480, min: 240 },
          },
        },
        ...(availableCameras.length > 0
          ? availableCameras.map((camera) => ({
              video: {
                deviceId: { exact: camera.deviceId },
                width: { ideal: 1280, min: 640 },
                height: { ideal: 720, min: 480 },
              },
            }))
          : []),
        { video: true },
      ]

      let mediaStream: MediaStream | null = null

      for (let i = 0; i < constraints.length; i++) {
        try {
          console.log(`Trying camera constraint ${i + 1}:`, constraints[i])
          mediaStream = await navigator.mediaDevices.getUserMedia(constraints[i])
          console.log(`Camera stream obtained with constraint ${i + 1}`)

          const videoTrack = mediaStream.getVideoTracks()[0]
          if (videoTrack) {
            const settings = videoTrack.getSettings()
            console.log("Video track settings:", settings)
            if (settings.facingMode) {
              setCurrentFacingMode(settings.facingMode as "user" | "environment")
            }
          }
          break
        } catch (err) {
          console.log(`Camera constraint ${i + 1} failed:`, err)
          if (i === constraints.length - 1) {
            throw err
          }
        }
      }

      if (!mediaStream) {
        throw new Error("Failed to get camera stream")
      }

      setCameraStatus("setting_up_video")
      setStream(mediaStream)
      setIsVideoReady(false)

      await new Promise((resolve) => setTimeout(resolve, 100))

      if (videoRef.current) {
        const video = videoRef.current
        video.srcObject = null
        video.load()

        const handleLoadedMetadata = () => {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            setCameraStatus("video_ready")
            setIsVideoReady(true)
          }
        }

        const handleCanPlay = () => {
          setCameraStatus("ready")
          setIsVideoReady(true)
        }

        const handlePlay = () => {
          setIsVideoReady(true)
          setCameraStatus("ready")
        }

        video.addEventListener("loadedmetadata", handleLoadedMetadata)
        video.addEventListener("canplay", handleCanPlay)
        video.addEventListener("play", handlePlay)

        video.srcObject = mediaStream
        video.autoplay = true
        video.playsInline = true
        video.muted = true

        try {
          const playPromise = video.play()
          if (playPromise !== undefined) {
            await playPromise
          }
        } catch (playError) {
          console.error("Video play error:", playError)
        }
      }

      setTimeout(() => {
        if (!isVideoReady && mediaStream && videoRef.current) {
          const video = videoRef.current
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            setIsVideoReady(true)
            setCameraStatus("ready")
          }
        }
      }, 2000)
    } catch (err) {
      console.error("Camera initialization error:", err)
      setCameraStatus("error")
      throw err
    }
  }

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      throw new Error("Camera components not ready")
    }

    const video = videoRef.current
    const canvas = canvasRef.current

    if (video.readyState < 2) {
      throw new Error("Video not ready for capture. Please wait or try again.")
    }

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      throw new Error("Video has no dimensions. Please check camera connection.")
    }

    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Could not get canvas context")
    }

    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight

    canvas.width = videoWidth
    canvas.height = videoHeight
    context.clearRect(0, 0, videoWidth, videoHeight)

    // For front camera, flip the image horizontally
    if (currentFacingMode === "user") {
      context.save()
      context.scale(-1, 1)
      context.translate(-videoWidth, 0)
      context.drawImage(video, 0, 0, videoWidth, videoHeight)
      context.restore()
    } else {
      context.drawImage(video, 0, 0, videoWidth, videoHeight)
    }

    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9)

    if (imageDataUrl === "data:," || imageDataUrl.length < 100) {
      throw new Error("Failed to capture image data")
    }

    return imageDataUrl
  }, [currentFacingMode])

  return {
    videoRef,
    canvasRef,
    stream,
    isVideoReady,
    cameraStatus,
    currentFacingMode,
    availableCameras,
    isMobile,
    getAvailableCameras,
    cleanupCamera,
    startCamera,
    capturePhoto,
  }
}
