import React from "react";

const Note = (props) => {
    //sconsole.log('Note: ', props.note.content);
    return (
        <div>
            <li>{props.note.content}</li>
        </div>
    )
}

export default Note