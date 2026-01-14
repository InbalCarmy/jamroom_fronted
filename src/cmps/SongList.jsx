import { SongPreview } from "./SongPreview"
import { Link } from "react-router-dom"


export function SongList({songs}){



    return(
        <ul className="song-list">
            {songs.map(song =>
                <li key={song._id}>
                    <Link to={`/song/${song._id}`}>
                        <SongPreview song={song}/>
                    </Link>

                </li>
            )}
        </ul>
    )
}