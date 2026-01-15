import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { SongLyrics } from "../cmps/SongLyrics"
import { useEffect, useState } from "react"
import { loadSong } from "../store/song/song.actions"
import { socketService } from "../services/socket.service"


export function LivePage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const song = useSelector(storeState => storeState.songModule.song)
    const navigate = useNavigate()
    const {id} = useParams()
    const [isAutoScrolling, setIsAutoScrolling] = useState(false) 


    useEffect(() => {
        loadSong(id)
    },[id])

    useEffect(() => {
        if (!user) {
            navigate("/main")
        }
    }, [user, navigate])

    useEffect(() => {
        if (user?.isAdmin && song?._id) {
            const handleSongRequest = () => {
                socketService.emit('current-song', { songId: song._id })
            }
            
            socketService.on('request-current-song', handleSongRequest)
            
            return () => {
                socketService.off('request-current-song', handleSongRequest)
            }
        }
    }, [user, song])

    useEffect(() => {
        let scrollInterval = null
        
        if (isAutoScrolling) {
            scrollInterval = setInterval(() => {
                // Scroll down by a small amount (adjust speed here)
                window.scrollBy({
                    top: 2,  // 2 pixels down per interval
                    behavior: 'smooth'
                })
                
                // stop when reaching bottom
                if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                    setIsAutoScrolling(false)
                }
            }, 50) 
        }
        
        return () => {
            if (scrollInterval) {
                clearInterval(scrollInterval)
            }
        }
    }, [isAutoScrolling])

    function handleScroll(){
        setIsAutoScrolling(prev => !prev)
    }

    function handleExit(){
        navigate('/main')
    }    

    const showChords = user.instrument !== 'Vocals'

    return (
        <section className="live-page">
            <div className="live-page-btns">
                <button 
                    className={`scroll-btn ${isAutoScrolling ? 'active' : ''}`}
                    onClick={handleScroll}>
                    {isAutoScrolling ? 'Stop Scroll' : 'Auto Scroll'}
                </button>
                {user?.isAdmin && 
                <button onClick={handleExit}>Exit Live</button>
                }                
            </div>

            <SongLyrics song={song} showChords={showChords} />
        </section>
    )
}
