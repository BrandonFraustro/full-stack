import React from "react";

const Footer = () => {
    const style = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
    }

    return (
        <div style={style}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
        </div>
    )
}

export default Footer