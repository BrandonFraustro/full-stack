import React from "react";
import './Note.css'

const Note = ({ note, toggleImportance }) => {
    //console.log('Note: ', note);

    const label = note.important 
    ? 'Make not important' : 'Make important'

    return (
        <div>
            <li className="note">
                {note.content}
                <button onClick={toggleImportance}>{label}</button>
            </li>
        </div>
    )
}

export default Note