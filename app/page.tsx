import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Music Explorer</h1>
          <p className="text-lg text-muted-foreground">Discover your favorite artists and explore their tracks</p>
        </div>

        <Link href="/selection">
          <Button size="lg" className="w-full">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  )
}
