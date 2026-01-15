import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadSongs} from '../store/song/song.actions'
import { SongList } from "../cmps/SongList"
import { SongFilter } from "../cmps/SongFilter"
import { socketService, SOCKET_EVENT_SONG_SELECTED, SOCKET_EVENT_END_SESSION } from '../services/socket.service'
import { useLocation } from 'react-router-dom'

export function MainPage(){
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState({txt:''})
    const songs = useSelector(storeState => storeState.songModule.songs)
    const location = useLocation()  


    useEffect(()=> {
        loadSongs(filterBy)
    },[filterBy])
    
    useEffect(() => {
        if (user?.isAdmin && location.pathname === '/main') {
            socketService.emit(SOCKET_EVENT_END_SESSION)
        }
    }, [location.pathname, user])

    function onSetFilterBy(filterBy) {
        setFilterBy(prev => ({...prev, ...filterBy}))
    }

    function onSongSelect(songId){
        socketService.emit(SOCKET_EVENT_SONG_SELECTED, {songId})
    }
    

    if(!user){
        return(
            <section className="main-page">
                <div>
                    <h1>Please log in</h1>
                <Link to='/login'>
                <button> login page </button>
                </Link>
                </div>
            </section>
        )
    }

    if(user.isAdmin){
        return(
            <section className="main-page admin">
                <h1>Search for a song...</h1>
                <SongFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
                <SongList songs={songs} onSongSelect={onSongSelect}/>
            </section>
        )
    } 
    
    
    
    else if (!user.isAdmin ){
        return(
            <section className="main-page">
                <div>
                    <h1>Waiting for next song...</h1>
                </div>
            </section>
        )
    }

}