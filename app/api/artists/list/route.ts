import { NextResponse } from "next/server"

interface Artist {
  id: string
  name: string
}

// Mock artist data - in a real app, this would come from a database
const ARTISTS: Artist[] = [
  { id: "taylor-swift", name: "Taylor Swift" },
  { id: "ed-sheeran", name: "Ed Sheeran" },
]

export async function GET() {
  return NextResponse.json({ artists: ARTISTS })
}
