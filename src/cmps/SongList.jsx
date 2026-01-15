import { SongPreview } from "./SongPreview"
import { useNavigate } from "react-router-dom"


export function SongList({songs, onSongSelect}){
    const navigate = useNavigate()


    function onChooseSong(songId){
        onSongSelect(songId)
        navigate(`/song/${songId}`)
    }



    return(
        <ul className="song-list">
            {songs.map(song =>
                <li key={song._id}>
                    <button onClick={() => onChooseSong(song._id)}>
                        <SongPreview song={song}/>
                    </button>
                </li>
            )}
        </ul>
    )
}