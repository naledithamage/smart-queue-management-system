"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle, Globe, Heart, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/lib/translations"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("about.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("about.mission")}</h2>
            <p className="text-lg mb-4">{t("about.missionText1")}</p>
            <p className="text-lg mb-4">{t("about.missionText2")}</p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/register">
                  {t("about.createAccount")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">{t("about.features")}</h3>
            <ul className="space-y-4">
              <li className="flex">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
                <span>{t("about.feature1")}</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
                <span>{t("about.feature2")}</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
                <span>{t("about.feature3")}</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
                <span>{t("about.feature4")}</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
                <span>{t("about.feature5")}</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
                <span>{t("about.feature6")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Heart className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>{t("about.communityFocused")}</CardTitle>
              <CardDescription>{t("about.communityDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t("about.communityText")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>{t("about.privacy")}</CardTitle>
              <CardDescription>{t("about.privacyDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t("about.privacyText")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>{t("about.accessibility")}</CardTitle>
              <CardDescription>{t("about.accessibilityDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t("about.accessibilityText")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-green-50 dark:bg-green-950 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">{t("about.team")}</h2>
            <p className="text-lg max-w-3xl mx-auto">{t("about.teamDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-green-100 text-green-600 text-xl">NT</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
              </Avatar>
              <h3 className="text-lg font-semibold">Naledi Thamage</h3>
            </div>

            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-green-100 text-green-600 text-xl">BP</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
              </Avatar>
              <h3 className="text-lg font-semibold">Brandon Plaatjies</h3>
            </div>

            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-green-100 text-green-600 text-xl">MM</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
              </Avatar>
              <h3 className="text-lg font-semibold">Mosa Maseko</h3>
            </div>

            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-green-100 text-green-600 text-xl">NL</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
              </Avatar>
              <h3 className="text-lg font-semibold">Neo Letswalo</h3>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("about.joinMission")}</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">{t("about.joinText")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/register">
                {t("about.createAccount")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/symptom-checker">{t("about.trySymptomChecker")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
