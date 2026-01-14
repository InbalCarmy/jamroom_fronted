import { httpService } from './http.service'


export const songService = {
    getById,
    getSongs
}

function getSongs(filterBy = {txt: ''}) {
    return httpService.get(`song`, filterBy)
}

async function getById(songId) {
    const song = await httpService.get(`song/${songId}`)
    return song
}