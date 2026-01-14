import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadSongs} from '../store/song/song.actions'
import { SongList } from "../cmps/SongList"
import { SongFilter } from "../cmps/SongFilter"


export function MainPage(){
    const user = useSelector(storeState => storeState.userModule.user)
    const [song, setSong] = useState('')
    const [filterBy, setFilterBy] = useState({txt:''})
    const songs = useSelector(storeState => storeState.songModule.songs)

    useEffect(()=> {
        loadSongs(filterBy)
    },[filterBy])
    


    function onSetFilterBy(filterBy) {
        setFilterBy(prev => ({...prev, ...filterBy}))
    }
    

    if(!user){
        return(
            <section className="main-page">
                <div>
                    <h1>Please log in</h1>
                <Link to='/'>
                <button> login page </button>
                </Link>
                </div>
            </section>
        )
    }

    if(user.isAdmin && !song){
        return(
            <section className="main-page-admin">
                <h1>Search for a song...</h1>
                <SongFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
                <SongList songs={songs}/>
            </section>
        )
    } 
    
    
    
    else if (!user.isAdmin && !song){
        return(
            <section>
                <div>
                    <h1>Waiting for next song...</h1>
                </div>
            </section>
        )
    }

}