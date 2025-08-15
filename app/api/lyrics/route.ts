import { type NextRequest, NextResponse } from "next/server"

interface LyricsData {
  lyrics: string
  artist: string
  track: string
}

interface ApiError {
  error: string
}

// Simple mock lyrics data - just one or two short songs
const MOCK_LYRICS: Record<string, Record<string, string>> = {
  "taylor-swift": {
    "Anti-Hero": `I have this thing where I get older but just never wiser
Midnights become my afternoons
When my depression works the graveyard shift
All of the people I've ghosted stand there in the room

It's me, hi, I'm the problem, it's me
At tea time, everybody agrees
I'll stare directly at the sun but never in the mirror
It must be exhausting always rooting for the anti-hero`,
  },
  "ed-sheeran": {
    "Shape of You": `The club isn't the best place to find a lover
So the bar is where I go
Me and my friends at the table doing shots
Drinking fast and then we talk slow

Girl, you know I want your love
Your love was handmade for somebody like me
Come on now, follow my lead
I may be crazy, don't mind me`,
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const artist = searchParams.get("artist")
  const track = searchParams.get("track")


  if (!artist || !track) {
    const errorResponse: ApiError = { error: "Artist and track are required" }
    return NextResponse.json(errorResponse, { status: 400 })
  }

  const artistLyrics = MOCK_LYRICS[artist]
  if (!artistLyrics || !artistLyrics[track]) {
    const errorResponse: ApiError = { error: "Lyrics not found" }
    return NextResponse.json(errorResponse, { status: 404 })
  }

  const response: LyricsData = {
    lyrics: artistLyrics[track],
    artist,
    track,
  }
  
  return NextResponse.json(response)
}
