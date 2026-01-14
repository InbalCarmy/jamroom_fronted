import '../assets/style/cmp/SongLyrics.css'

export function SongLyrics({ song, showChords }) {
    if (!song) {
        return <div>No song data available</div>
    }

    // Extract lyrics from numeric keys (0, 1, 2, 3...) if lyrics property doesn't exist
    let lyrics = song.lyrics

    if (!lyrics) {
        // Get all numeric keys and sort them
        const numericKeys = Object.keys(song)
            .filter(key => !isNaN(key))
            .sort((a, b) => Number(a) - Number(b))

        if (numericKeys.length > 0) {
            lyrics = numericKeys.map(key => song[key])
        }
    }

    if (!lyrics || lyrics.length === 0) {
        return <div>No lyrics available</div>
    }

    return (
        <section className="song-lyrics">
            <h2>{song.title}</h2>
            <h3>{song.artist}</h3>

            <div className="lyrics-content">
                {lyrics.map((line, lineIdx) => (
                    <div key={lineIdx} className="lyrics-line">
                        {line.map((segment, segmentIdx) => (
                            <div key={segmentIdx} className="lyrics-segment">
                                {showChords && segment.chords && (
                                    <div className="chord">{segment.chords}</div>
                                )}
                                <div className="lyric">{segment.lyrics}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
