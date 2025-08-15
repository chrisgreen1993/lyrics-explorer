"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { LyricsDisplay } from "@/components/lyrics-display"

interface LyricsData {
  lyrics: string
  artist: string
  track: string
}

interface LyricsDisplayWrapperProps {
  artist?: string
  track?: string
}

export function LyricsDisplayWrapper({ artist, track }: LyricsDisplayWrapperProps) {
  const [lyricsData, setLyricsData] = useState<LyricsData | null>(null)
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false)
  const [lyricsError, setLyricsError] = useState<string | null>(null)
  const [currentArtist, setCurrentArtist] = useState<string>("")
  const [currentTrack, setCurrentTrack] = useState<string>("")

  useEffect(() => {
    if (artist && track) {
      setCurrentArtist(artist)
      setCurrentTrack(track)
      setLyricsData(null)
      setLyricsError(null)
    }
  }, [artist, track])

  const handleGetLyrics = async () => {
    if (!currentArtist || !currentTrack) return

    setIsLoadingLyrics(true)
    setLyricsError(null)

          try {
        const response = await fetch(
          `/api/lyrics?artist=${encodeURIComponent(currentArtist)}&track=${encodeURIComponent(currentTrack)}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch lyrics")
        }

        const data = await response.json()
        setLyricsData(data)
    } catch (error) {
      console.error("[v0] Error fetching lyrics:", error)
      setLyricsError("Failed to fetch lyrics. Please try again.")
    } finally {
      setIsLoadingLyrics(false)
    }
  }

  if (!currentArtist || !currentTrack) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          onClick={handleGetLyrics}
          disabled={isLoadingLyrics}
          className="w-full max-w-xs"
        >
          {isLoadingLyrics ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Fetching Lyrics...
            </>
          ) : (
            "Get Lyrics"
          )}
        </Button>
      </div>

      {lyricsError && <p className="text-sm text-destructive text-center">{lyricsError}</p>}

      {lyricsData && (
        <LyricsDisplay 
          lyrics={lyricsData.lyrics} 
          artist={lyricsData.artist} 
          track={lyricsData.track} 
        />
      )}
    </div>
  )
}
