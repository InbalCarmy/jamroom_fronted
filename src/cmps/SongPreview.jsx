

export function SongPreview({song}){


    return(
        <section className="song-preview">
            <p>{song.title}</p>
            {song?.imgUrl &&
                        <img src={song.imgUrl} alt={song.title} />
            }
            <p>{song.artist}</p>


        </section>
    )
}