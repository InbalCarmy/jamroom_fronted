import { songService } from "../../services/song.service";
import { SET_SONGS, SET_SONG } from "./song.reducer";
import { store } from '../store'
import { showErrorMsg } from "../../services/event-bus.service";



export async function loadSongs(filterBy){
    try{
        const songs = await songService.getSongs(filterBy)
        store.dispatch({type: SET_SONGS, songs})
    } catch(err) {
        console.log('SongAction: err in loadSongs', err);
        
    }
}




export async function loadSong(songId) {
    console.log('songId', songId);
    try {
        const song = await songService.getById(songId)
        store.dispatch({ type: SET_SONG, song })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}