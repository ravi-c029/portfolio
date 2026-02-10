import { NextResponse } from "next/server";

// --- CONFIGURATION ---
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "ravi-c029"; // Default username

// Spotify Config
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

// --- HELPER: GET ACCESS TOKEN ---
const getAccessToken = async () => {
  if (!refresh_token) return null;
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};

export async function GET() {
  // 1. FETCH GITHUB DATA
  let githubData = { status: "Offline", lastPush: "Unknown" };
  try {
    const ghRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    const events = await ghRes.json();
    const pushEvent = events.find((e: any) => e.type === "PushEvent");
    
    if (pushEvent) {
      githubData = {
        status: "Active",
        lastPush: new Date(pushEvent.created_at).toLocaleString(),
      };
    }
  } catch (e) {
    console.error("GitHub Fetch Error");
  }

  // 2. FETCH SPOTIFY DATA
  let spotifyData = { isPlaying: false, song: "", artist: "", url: "" };
  try {
    const { access_token } = await getAccessToken() || {};
    
    if (access_token) {
      const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      if (response.status === 200) {
        const song = await response.json();
        if (song.is_playing) {
          spotifyData = {
            isPlaying: true,
            song: song.item.name,
            artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
            url: song.item.external_urls.spotify,
          };
        }
      }
    }
  } catch (e) {
    console.error("Spotify Fetch Error");
  }

  return NextResponse.json({ github: githubData, spotify: spotifyData });
}