import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { SongLyrics } from "../cmps/SongLyrics"
import { useEffect } from "react"
import { loadSong } from "../store/song/song.actions"


export function LivePage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const song = useSelector(storeState => storeState.songModule.song)
    const navigate = useNavigate()
    const {id} = useParams()


    useEffect(() => {
        loadSong(id)
    },[id])

    if (!user) {
        navigate("/main")
        return null
    }

    if (!song || !song._id) {
        return (
            <section className="live-page">
                <h1>Waiting for a song to be selected...</h1>
            </section>
        )
    }

    const showChords = user.instrument !== 'vocals'

    return (
        <section className="live-page">
            <SongLyrics song={song} showChords={showChords} />
        </section>
    )
}
