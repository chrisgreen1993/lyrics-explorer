"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface Artist {
  id: string
  name: string
}

interface ArtistSelectionFormProps {
  onSelectionChange?: (artist: string, track: string) => void
}

export function ArtistSelectionForm({ onSelectionChange }: ArtistSelectionFormProps) {
  const [selectedArtist, setSelectedArtist] = useState<string>("")
  const [selectedTrack, setSelectedTrack] = useState<string>("")
  const [artists, setArtists] = useState<Artist[]>([])
  const [tracks, setTracks] = useState<string[]>([])
  const [isLoadingArtists, setIsLoadingArtists] = useState(true)
  const [isLoadingTracks, setIsLoadingTracks] = useState(false)

  // Fetch artists on component mount
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/artists/list')
        if (!response.ok) {
          throw new Error('Failed to fetch artists')
        }
        const data = await response.json()
        setArtists(data.artists)
      } catch (error) {
        console.error('Error fetching artists:', error)
      } finally {
        setIsLoadingArtists(false)
      }
    }

    fetchArtists()
  }, [])

  // Fetch tracks when artist is selected
  useEffect(() => {
    if (!selectedArtist) {
      setTracks([])
      setSelectedTrack("")
      return
    }

    const fetchTracks = async () => {
      setIsLoadingTracks(true)
      try {
        const response = await fetch(`/api/artists?artistId=${encodeURIComponent(selectedArtist)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch tracks')
        }
        const data = await response.json()
        setTracks(data.tracks)
      } catch (error) {
        console.error('Error fetching tracks:', error)
        setTracks([])
      } finally {
        setIsLoadingTracks(false)
      }
    }

    fetchTracks()
  }, [selectedArtist])

  const handleArtistChange = (artistId: string) => {
    setSelectedArtist(artistId)
    setSelectedTrack("")
    if (onSelectionChange) {
      onSelectionChange(artistId, "")
    }
  }

  const handleTrackChange = (trackName: string) => {
    setSelectedTrack(trackName)
    if (onSelectionChange) {
      onSelectionChange(selectedArtist, trackName)
    }
  }

  if (isLoadingArtists) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading artists...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="artist-select" className="text-sm font-medium text-foreground">
          Artist
        </label>
        <Select value={selectedArtist} onValueChange={handleArtistChange}>
          <SelectTrigger id="artist-select">
            <SelectValue placeholder="Choose an artist" />
          </SelectTrigger>
          <SelectContent>
            {artists.map((artist) => (
              <SelectItem key={artist.id} value={artist.id}>
                {artist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="track-select" className="text-sm font-medium text-foreground">
          Track
        </label>
        <Select
          value={selectedTrack}
          onValueChange={handleTrackChange}
          disabled={!selectedArtist || isLoadingTracks}
        >
          <SelectTrigger id="track-select">
            <SelectValue
              placeholder={
                !selectedArtist
                  ? "Select an artist first"
                  : isLoadingTracks
                    ? "Loading tracks..."
                    : "Choose a track"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {tracks.map((track) => (
              <SelectItem key={track} value={track}>
                {track}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
