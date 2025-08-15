"use client"

import { useState } from "react"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Music } from "lucide-react"
import Link from "next/link"
import { ArtistSelectionForm } from "@/components/artist-selection-form"
import { LyricsDisplayWrapper } from "@/components/lyrics-display-wrapper"

export default function SelectionPage() {
  const [selectedArtist, setSelectedArtist] = useState<string>("")
  const [selectedTrack, setSelectedTrack] = useState<string>("")

  const handleSelectionChange = (artist: string, track: string) => {
    setSelectedArtist(artist)
    setSelectedTrack(track)
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Select Artist & Track</h1>
            <p className="text-muted-foreground">Choose an artist and one of their tracks</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Music Selection
            </CardTitle>
            <CardDescription>First select an artist, then choose from their available tracks</CardDescription>
          </CardHeader>
          <CardContent>
            <ArtistSelectionForm onSelectionChange={handleSelectionChange} />
          </CardContent>
        </Card>

        <Suspense fallback={<div>Loading lyrics...</div>}>
          <LyricsDisplayWrapper artist={selectedArtist} track={selectedTrack} />
        </Suspense>
      </div>
    </main>
  )
}
