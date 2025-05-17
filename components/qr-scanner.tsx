"use client"

import { useRef, useState, useEffect } from "react"
import jsQR from "jsqr"

interface QRScannerProps {
  onScan: (data: string) => void
  onError: (error: string) => void
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  // Start the camera
  useEffect(() => {
    let stream: MediaStream | null = null
    let animationFrameId: number

    async function startCamera() {
      try {
        // Request camera permission and get stream
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Use back camera if available
          audio: false,
        })

        // Set video source to camera stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
          setCameraError(null)
          setIsScanning(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setHasPermission(false)

        if ((err as Error).name === "NotAllowedError") {
          setCameraError("Camera permission denied. Please allow camera access.")
        } else if ((err as Error).name === "NotFoundError") {
          setCameraError("No camera found on this device.")
        } else {
          setCameraError(`Error accessing camera: ${(err as Error).message}`)
        }

        onError((err as Error).message)
      }
    }

    // Scan for QR codes
    function scanQRCode() {
      if (!isScanning || !videoRef.current || !canvasRef.current) return
      
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) return
      console.log("scanning...")

      // Check if video is ready
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        console.log("HAVE_ENOUGH_DATA")
        // Set canvas dimensions to match video
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Get image data for QR code detection
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        console.log("imageData", imageData)

        // Detect QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert", // QR codes in camera are usually black on white
        })
        console.log("code", code)
        // If QR code is detected
        if (code) {
          console.log("QR code detected:", code.data)
          setIsScanning(false)
          onScan(code.data)
          return // Stop scanning after successful detection
        }
      }

      // Continue scanning
      animationFrameId = requestAnimationFrame(scanQRCode)
    }

    startCamera()

    // Start scanning when video is ready
    const handleVideoPlay = () => {
      scanQRCode()
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("play", handleVideoPlay)
    }

    // Clean up
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handleVideoPlay)
      }
    }
  }, [isScanning, onScan, onError])

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {hasPermission === false && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-md mb-4">
          {cameraError || "Camera access denied or not available"}
        </div>
      )}

      <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#3859d4]">
        {/* Camera feed */}
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay playsInline muted />

        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-0.5 bg-[#3859d4] animate-pulse"></div>
            <div className="h-full w-0.5 bg-[#3859d4] animate-pulse"></div>
          </div>
        )}

        {/* QR code detection canvas (hidden) */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Viewfinder corners */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#3859d4]"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#3859d4]"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#3859d4]"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#3859d4]"></div>
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-white mt-4">
        {isScanning ? "Point your camera at a QR code" : "Initializing camera..."}
      </p>
    </div>
  )
}
