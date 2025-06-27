"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Phone, Ambulance, MapPin } from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EmergencyServices() {
  const { t } = useTranslation()
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const getLocation = () => {
    setIsGettingLocation(true)
    setLocationError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError(t("emergency.locationError"))
          setIsGettingLocation(false)
        },
      )
    } else {
      setLocationError(t("emergency.locationNotSupported"))
      setIsGettingLocation(false)
    }
  }

  const callEmergencyService = (number: string, service: string) => {
    // In a real app, this would use the system's phone API
    // For now, we'll just log and show an alert
    console.log(`Calling ${service} at ${number}`)

    // If we have location, we would send it along with the call
    if (location) {
      console.log(`Sending location: ${location.latitude}, ${location.longitude}`)
    }

    // In a browser, we can use tel: protocol
    window.location.href = `tel:${number}`
  }

  return (
    <Card className="border-red-200">
      <CardHeader className="bg-red-50 dark:bg-red-950 rounded-t-lg">
        <CardTitle className="text-red-600 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {t("emergency.title")}
        </CardTitle>
        <CardDescription>{t("emergency.description")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {locationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button
            className="w-full bg-red-600 hover:bg-red-700 h-auto py-4 flex items-center justify-start"
            onClick={() => callEmergencyService("10111", "SAPS")}
          >
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
              <Phone className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">🚓 SAPS (Police)</p>
              <p className="text-sm text-red-100">10111</p>
            </div>
          </Button>

          <Button
            className="w-full bg-red-600 hover:bg-red-700 h-auto py-4 flex items-center justify-start"
            onClick={() => callEmergencyService("10177", "Ambulance")}
          >
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
              <Ambulance className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">🚑 {t("emergency.ambulance")}</p>
              <p className="text-sm text-red-100">10177</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600"
            onClick={getLocation}
            disabled={isGettingLocation}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {isGettingLocation
              ? t("emergency.gettingLocation")
              : location
                ? t("emergency.locationUpdated")
                : t("emergency.shareLocation")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
