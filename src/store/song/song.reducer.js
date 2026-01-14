
// import { songService } from "../../services/song.service"
export const SET_SONG = 'SET_SONG'
export const SET_SONGS = 'SET_SONGS'


const initialState ={
    song: {},
    songs: []
}


export function songReducer(state = initialState, action){
    var newState = state
    switch (action.type){
        case SET_SONG:
            newState = {...state, song: action.song}
            break
        case SET_SONGS:
            newState = {...state, songs: action.songs}
            break
    }
    return newState
}