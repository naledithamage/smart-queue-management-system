"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Bell, CheckCircle, Globe, Lock, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/lib/translations"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [familyName, setFamilyName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    medications: true,
    familyUpdates: true,
    healthTips: false,
  })
  const { t, language, setLanguage, availableLanguages } = useTranslation()

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userStr = localStorage.getItem("user")

        if (userStr) {
          const user = JSON.parse(userStr)
          setUserData(user)
          setFamilyName(user.familyName || "")
          setEmail(user.email || "")
          setPhone(user.phone || "")
        }
      } catch (e) {
        console.error("Error loading user data:", e)
        setError("Failed to load user data")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  const handleProfileUpdate = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local storage
      const updatedUser = {
        ...userData,
        familyName,
        email,
        phone,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)

      setSuccess("Profile updated successfully")
    } catch (err: any) {
      console.error("Error updating profile:", err)
      setError(err.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Password changed successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      console.error("Error changing password:", err)
      setError(err.message || "Failed to change password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Notification settings updated successfully")
    } catch (err: any) {
      console.error("Error updating notification settings:", err)
      setError(err.message || "Failed to update notification settings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setSuccess("Language updated successfully")
  }

  if (isLoading && !userData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>{t("common.loading")}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("settings.title")}</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("common.error")}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>{t("common.success")}</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            {t("settings.profile")}
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            {t("settings.security")}
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Bell className="h-4 w-4 mr-2" />
            {t("settings.preferences")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.profileSettings")}</CardTitle>
              <CardDescription>{t("settings.profileSettingsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="familyName">{t("settings.familyName")}</Label>
                <Input id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("settings.email")}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("settings.phone")}</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileUpdate} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? t("common.saving") : t("common.save")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.changePassword")}</CardTitle>
              <CardDescription>{t("settings.changePasswordDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t("settings.currentPassword")}</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t("settings.newPassword")}</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("settings.confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePasswordChange}
                disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? t("common.saving") : t("settings.updatePassword")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.notifications")}</CardTitle>
                <CardDescription>{t("settings.notificationsDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.appointmentReminders")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.appointmentRemindersDesc")}</p>
                  </div>
                  <Switch
                    checked={notificationSettings.appointments}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, appointments: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.medicationReminders")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.medicationRemindersDesc")}</p>
                  </div>
                  <Switch
                    checked={notificationSettings.medications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, medications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.familyUpdates")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.familyUpdatesDesc")}</p>
                  </div>
                  <Switch
                    checked={notificationSettings.familyUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, familyUpdates: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.healthTips")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.healthTipsDesc")}</p>
                  </div>
                  <Switch
                    checked={notificationSettings.healthTips}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, healthTips: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleNotificationUpdate}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? t("common.saving") : t("common.save")}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  {t("language.switchLanguage")}
                </CardTitle>
                <CardDescription>{t("settings.languageDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
