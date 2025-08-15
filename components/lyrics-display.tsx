"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Music2 } from "lucide-react"

interface LyricsDisplayProps {
  lyrics: string
  artist: string
  track: string
}

interface SearchResult {
  count: number
  highlightedLyrics: string
}

export function LyricsDisplay({ lyrics, artist, track }: LyricsDisplayProps) {
  const [searchWord, setSearchWord] = useState("")
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)

  const handleWordSearch = () => {
    if (!searchWord.trim()) {
      setSearchResult(null)
      return
    }

    // Count occurrences (case-insensitive)
    const regex = new RegExp(`\\b${searchWord.trim()}\\b`, "gi")
    const matches = lyrics.match(regex)
    const count = matches ? matches.length : 0

    // Highlight the word in lyrics
    const highlighted = lyrics.replace(regex, `<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$&</mark>`)
    
    setSearchResult({
      count,
      highlightedLyrics: highlighted
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleWordSearch()
    }
  }

  const displayLyrics = searchResult ? searchResult.highlightedLyrics : lyrics

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music2 className="w-5 h-5" />
            {track}
          </CardTitle>
          <CardDescription>by {artist}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="whitespace-pre-line text-sm leading-relaxed text-foreground"
            dangerouslySetInnerHTML={{ __html: displayLyrics }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Word Search
          </CardTitle>
          <CardDescription>Search for a specific word in the lyrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a word to search..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleWordSearch} size="default">
              Search
            </Button>
          </div>

          {searchResult && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">The word &ldquo;{searchWord}&rdquo; appears</span>
              <Badge variant={searchResult.count > 0 ? "default" : "secondary"}>
                {searchResult.count} {searchResult.count === 1 ? "time" : "times"}
              </Badge>
              <span className="text-sm text-muted-foreground">in the lyrics</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
