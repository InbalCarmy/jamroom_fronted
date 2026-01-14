import { useEffect, useState } from "react"


export function SongFilter({filterBy, onSetFilterBy}){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    },[filterByToEdit])

    function handleChange({target}){
        const {name, type} = target
        const value = type === 'number' ? +target.value : target.value
        setFilterByToEdit(prev => ({...prev, [name]: value}) )
    }
    

    return(
        <form action="">
            <input
                type="text"
                name="txt"
                value = {filterByToEdit.txt}
                onChange={handleChange}
                placeholder="Search song"
                />
            <button>Search</button>
        </form>

    )
}