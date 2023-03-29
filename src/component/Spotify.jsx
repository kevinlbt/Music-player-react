import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios'


export function Spotify ({setTracks, setCurrentTrack}) {
    
    const CLIENT_ID = "f8c8422808a24f33843409a0652803a6"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    useEffect (() => {

        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token);

    }, []);

    useEffect (() => {
        let tracks = [];
      (async function () {
        const {data} = await axios.get("https://api.spotify.com/v1/playlists/37i9dQZF1DWZ27zYbfKITD", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        
        data.tracks.items.forEach((item) => {
            let name = item.track.name;
            let artists = item.track.artists[0].name;
            let thumbnail = item.track.album.images[0].url;
            let src = item.track.preview_url;
            tracks.push({title: name, src:src, author:artists,thumbnail:thumbnail})
        })
        
        console.log(data.tracks.items[0])
        setTracks(tracks);
        setCurrentTrack(tracks[0])
      })();

    }, [token,setTracks,setCurrentTrack])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return <div>
        <h1>login to spotify</h1>
        {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} >login</a> : <button onClick={logout}>Logout</button>}
    </div>
}