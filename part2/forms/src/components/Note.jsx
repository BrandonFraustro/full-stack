import React from "react";

const Note = ({ note, toggleImportance }) => {
    //console.log('Note: ', note);

    const label = note.important 
    ? 'make not important' : 'make important'

    return (
        <div>
            <li>
                {note.content}
                <button onClick={toggleImportance}>{label}</button>
            </li>
        </div>
    )
}

export default Note