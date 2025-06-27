import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HealthAssist</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered health assistant serving the local community with guidance and support.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/symptom-checker"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/clinic-queue"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clinic Queue
                </Link>
              </li>
              <li>
                <Link
                  href="/health-info"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Health Information
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/health-info/tb"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  TB Information
                </Link>
              </li>
              <li>
                <Link
                  href="/health-info/hiv"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  HIV Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/health-info/malaria"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Malaria Prevention
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HealthAssist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
