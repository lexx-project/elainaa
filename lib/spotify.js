import fetch from 'node-fetch'

const client_id = 'acc6302297e040aeb6e4ac1fbdfd62c3'
const client_secret = '0e8439a1280a43aba9a5bc0a16f3f009'
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials"
        })
    })

    return response.json()
}

const SpotifyAPI = async () => {
    const { access_token } = await getAccessToken()

    return {
        getUserData: async () => {
            const response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                },
            })
            return response.json()
        },
        getUserPlaylists: async (limit) => {
            const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    },
                }
            )
            return response.json()
        },
        getUserQueueData: async () => {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                },
            })
            return response.json()
        },
        addTrackToQueue: async (trackId) => {
            const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${trackId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                }
            )
            return response.json()
        },
        playPausePlayback: async (action) => {
            const response = await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                }
            })
            return response.json()
        },
        nextPlaybackTrack: async () => {
            const response = await fetch('https://api.spotify.com/v1/me/player/next', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                }
            })
            return response.json()
        },
        trackSearch: async (track) => {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=20`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    }
                }
            )
            return response.json()
        },
        getTracks: async (trackID, market = 'IN') => {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackID}?market=${market}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    }
                }
            )
            return response.json()
        },
        getPlaylistTracks: async (playlistId) => {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    }
                }
            )
            return response.json()
        }
    }
}
async function spotifyDl(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const match = url.match(/(track|album|playlist)\/([\w\d]+)/i)
            const type = match?.[1]
            const id = match?.[2]

            if (!id) return reject("Failed To Get Id! Enter Valid Spotify URL!")

            const headers = {
                Origin: "https://spotifydown.com",
                Referer: "https://spotifydown.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            }

            if (type === "track") {
                const data = await axios.get(`https://api.spotifydown.com/download/${id}`, { headers }).then(res => res.data)
                if (!data.success) return reject("Fail Fetching")
                
                const metadata = { ...data.metadata, type, music: data.link, link: url }
                delete metadata.cache
                delete metadata.success
                delete metadata.isrc

                resolve(metadata)
            } else {
                const metadata = await axios.get(`https://api.spotifydown.com/metadata/${type}/${id}`, { headers }).then(res => res.data)
                if (!metadata.success) return reject(`Failed To Get ${type} Metadata`)

                const trackList = await axios.get(`https://api.spotifydown.com/trackList/${type}/${id}`, { headers }).then(res => res.data)
                if (!trackList.success) return reject(`Failed To Get ${type} Tracklist`)

                const tracks = trackList.trackList.map(v => ({
                    id: v.id,
                    title: v.title,
                    artists: v.artists,
                    cover: v.cover || "",
                    link: `https://open.spotify.com/track/${v.id}`
                }))

                resolve({ type, link: url, ...metadata, track: tracks })
            }
        } catch (error) {
            reject(error)
        }
    })
}
export {
    SpotifyAPI,
    spotifyDl
}