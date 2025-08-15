You will start with a React app that allows you to chose an artist, and we then want to be able to select from their tracks.

If there’s time we’ll move on to Part 2, which involves building on this to allow a user to get the lyrics for a song and then find out how many times a word is used in that particular song.

**Some additional things you might want to think about during the interview:** accessibility, error handling, general UX, how you might improve things later down the line

---

# Part 1

## Home screen

You’ll start with a very simple home screen. It has a heading, subheading and button for navigating to the next page.

### **Requirements**

- The user presses the “Get started” button and is taken to the form for selecting the artist and track (on route `/selection`)

## Artist and track selection

The base of this page is already built, containing 2 select elements (one for artists and one for tracks) and a button for fetching the lyrics.

### **Requirements**

- The user is given a choice of 5 hard-coded artists
- The user is able to chose from all the tracks from that artist
    - N.B. You have already been given the API set up for getting the tracks for an artist

# Part 2

## Lyric fetching flow

Following on from the “artist and track selection”. This is the flow we would expect the user to experience:

1. User selects the artist
2. User selects track from that artist
3. User hit submit
4. User sees lyrics from that song

### **Requirements**

- Once the user has selected an artist and track, they are able to view the lyrics to that song
    - You will be given an API during to the interview to get the lyrics for a song.

## Word usage in lyrics

There is no pre-built UI for this section. This is the flow we would expect the user to experience:

1. User selects the artist
2. User selects track from that artist
3. User hits submit
4. User sees lyrics from that song

### Requirements

- The user is able to input a single word
- The user is able to see how many times that word is used in the lyrics