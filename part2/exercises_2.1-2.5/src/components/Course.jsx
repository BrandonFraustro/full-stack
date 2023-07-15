import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = (props) => {
    /* console.log('Course: ', props.course); */
    return (
        <div>
            <Header header={props.course}/>
            <Content content={props.course}/>
        </div>
    )
} 

export default Course