import React from "react";
import { useState, useEffect } from "react";


export function Spotify () {
    
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

        setToken(token)

    }, []);

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return <div>
        <h1>login to spotify</h1>
        {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} >login</a> : <button onClick={logout}>Logout</button>}
    </div>
}

