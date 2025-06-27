"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// English translations
const en = {
  common: {
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
    yearsOld: "years old",
    loading: "Loading...",
    success: "Success!",
    error: "Error",
    edit: "Edit",
    delete: "Delete",
    back: "Back",
    next: "Next",
  },
  login: {
    title: "Log in to your family account",
    description: "Enter your email and password to access your family health dashboard",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    submit: "Log in",
    loggingIn: "Logging in...",
    failed: "Failed to log in",
    error: "An error occurred during login",
    noAccount: "Don't have an account?",
    register: "Register",
  },
  auth: {
    logout: "Log out",
  },
  dashboard: {
    title: "Dashboard",
    welcome: "Welcome",
    findClinic: "Find Clinic",
    familyMembers: "Family Members",
    medications: "Medications",
    appointments: "Appointments",
    recentActivity: "Recent Activity",
    recentActivityDesc: "Your recent health-related activities",
    quickActions: "Quick Actions",
    addFamilyMember: "Add Family Member",
    addMedication: "Add Medication",
    scheduleAppointment: "Schedule Appointment",
    healthTips: "Health Tips",
    dailyTip: "Daily Health Tip",
    tipContent: "Staying hydrated is essential for good health. Aim to drink at least 8 glasses of water daily.",
    noFamilyMembers: "No family members added yet",
    addMember: "Add Member",
    addFirstMember: "Add Your First Family Member",
    noMedications: "No medications added yet",
    addFirstMedication: "Add Your First Medication",
    upcomingDoses: "Upcoming Doses",
    takenToday: "Taken Today",
    markTaken: "Mark as Taken",
    noAppointments: "No appointments scheduled yet",
    scheduleFirstAppointment: "Schedule Your First Appointment",
    noRecentActivity: "No recent activity",
  },
  symptom: {
    title: "Symptom Checker",
    description: "Check symptoms and get AI-powered health insights",
    medicalAttention: "Medical Attention",
    selfCare: "Self Care",
    severity: "Severity",
    diagnosis: "Diagnosis",
    viewDetails: "View Details",
    checkNew: "Check New Symptoms",
  },
  emergency: {
    title: "Emergency Services",
    description: "Quick access to emergency services in South Africa",
    ambulance: "Ambulance",
    fireDepartment: "Fire Department",
    shareLocation: "Share My Location",
    gettingLocation: "Getting location...",
    locationUpdated: "Location updated",
    locationShared: "Location shared",
    locationError: "Could not get your location",
    locationNotSupported: "Location services not supported",
  },
  settings: {
    title: "Settings",
    profile: "Profile",
    security: "Security",
    preferences: "Preferences",
    profileSettings: "Profile Settings",
    profileSettingsDesc: "Manage your account information",
    familyName: "Family Name",
    email: "Email",
    phone: "Phone Number",
    changePassword: "Change Password",
    changePasswordDesc: "Update your password to keep your account secure",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    updatePassword: "Update Password",
    notifications: "Notifications",
    notificationsDesc: "Manage your notification preferences",
    appointmentReminders: "Appointment Reminders",
    appointmentRemindersDesc: "Receive reminders about upcoming appointments",
    medicationReminders: "Medication Reminders",
    medicationRemindersDesc: "Get alerts when it's time to take medications",
    familyUpdates: "Family Updates",
    familyUpdatesDesc: "Notifications about family member health updates",
    healthTips: "Health Tips",
    healthTipsDesc: "Receive regular health tips and information",
    languageDesc: "Change the language of the application",
  },
  language: {
    switchLanguage: "Switch Language",
    english: "English",
    zulu: "isiZulu",
    xhosa: "isiXhosa",
    sotho: "Sesotho",
    pedi: "Sepedi",
    afrikaans: "Afrikaans",
  },
  about: {
    title: "About AI Health Assistant",
    subtitle: "Empowering communities with accessible healthcare guidance and support",
    mission: "Our Mission",
    missionText1:
      "AI Health Assistant was created to address healthcare access challenges in South African communities by providing reliable health information, symptom checking, and clinic connections through an accessible digital platform.",
    missionText2:
      "We aim to bridge the gap between communities and healthcare services, making quality health guidance available to everyone, regardless of location or resources.",
    features: "Key Features",
    feature1: "AI-powered symptom checking with personalized health insights",
    feature2: "Family health management for all household members",
    feature3: "Clinic queue management to reduce waiting times",
    feature4: "Educational resources on common health conditions",
    feature5: "Medication reminders and health tracking",
    feature6: "Available in multiple South African languages",
    communityFocused: "Community-Focused",
    communityDesc: "Designed for the specific needs of South African communities",
    communityText:
      "Our platform is tailored to address the unique healthcare challenges faced by South African communities, with a focus on common conditions like TB, HIV, and malaria, and integration with local clinic systems.",
    privacy: "Privacy & Security",
    privacyDesc: "Your health data is protected and secure",
    privacyText:
      "We prioritize the security and privacy of your health information. All data is encrypted and stored securely, and we never share your personal information without your explicit consent.",
    accessibility: "Accessibility",
    accessibilityDesc: "Healthcare guidance for everyone",
    accessibilityText:
      "Our platform is designed to be accessible to all, with support for multiple languages, low data usage, and a simple interface that works on a wide range of devices, including basic smartphones.",
    team: "Our Team",
    teamDesc:
      "Meet the dedicated professionals behind AI Health Assistant who are committed to improving healthcare access in South African communities.",
    joinMission: "Join Us in Our Mission",
    joinText:
      "Create a family account today and take the first step toward better health management for you and your loved ones.",
    createAccount: "Create Family Account",
    trySymptomChecker: "Try Symptom Checker",
  },
  chatbot: {
    title: "AI Health Assistant",
    description: "Ask health-related questions and get AI-powered guidance",
    placeholder: "Type your health question here...",
    thinking: "Thinking...",
    disclaimer:
      "This AI assistant provides general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
    welcome: "Hello! I'm your AI Health Assistant. How can I help you today?",
  },
}

// Zulu translations (use your translation object)
const zu = { /* translations as in your example */ };

// Add other language translations as needed

type TranslationContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
  availableLanguages: { code: string; name: string }[]
}

const availableLanguages = [
  { code: "en", name: "English" },
  { code: "zu", name: "isiZulu" },
  { code: "xh", name: "isiXhosa" },
  { code: "st", name: "Sesotho" },
  { code: "nso", name: "Sepedi" },
  { code: "af", name: "Afrikaans" },
]

const TranslationContext = createContext<TranslationContextType | null>(null)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
    setMounted(true)
  }, [])

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage)
      document.documentElement.lang = newLanguage
    }
  }

  // Function to get a translation by key
  const t = (key: string) => {
    if (!mounted) {
      return key
    }

    const keys = key.split(".")

    const translations: any = language === "zu" ? zu : en 

    let result: any = translations
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k]
      } else {
        return key 
      }
    }

    return typeof result === "string" ? result : key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
