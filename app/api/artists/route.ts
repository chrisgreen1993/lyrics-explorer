import { type NextRequest, NextResponse } from "next/server"

interface Artist {
  id: string
  name: string
}

interface ArtistTracks {
  artist: Artist
  tracks: string[]
}

interface ApiError {
  error: string
}

// Mock artist data - in a real app, this would come from a database
const ARTISTS: Artist[] = [
  { id: "taylor-swift", name: "Taylor Swift" },
  { id: "ed-sheeran", name: "Ed Sheeran" },
]

const TRACKS_BY_ARTIST: Record<string, string[]> = {
  "taylor-swift": ["Anti-Hero"],
  "ed-sheeran": ["Shape of You"],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const artistId = searchParams.get("artistId")

  if (!artistId) {
    const errorResponse: ApiError = { error: "Artist ID is required" }
    return NextResponse.json(errorResponse, { status: 400 })
  }

  const artist = ARTISTS.find(a => a.id === artistId)
  if (!artist) {
    const errorResponse: ApiError = { error: "Artist not found" }
    return NextResponse.json(errorResponse, { status: 404 })
  }

  const tracks = TRACKS_BY_ARTIST[artistId] || []
  const response: ArtistTracks = {
    artist,
    tracks
  }
  
  return NextResponse.json(response)
}
