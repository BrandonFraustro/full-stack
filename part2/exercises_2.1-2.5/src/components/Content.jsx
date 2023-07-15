import React from "react";
import { useState } from "react";
import Part from './Part'

const Content = (props) => {
    /* console.log('Content: ', props.content); */
    const cont = props.content.map(data => data.parts)
    const totals = props.content.map(
        data => {
            const arr = data.parts.map(datas => datas.exercises)
            return arr.reduce((s,p) => s + p)
        }
    )

    //console.log('Content: ', p);
    return (
        <div>
            {
                props.content.map((data, id) => (
                    <div key={data.id}>
                        <h2 key={data.id}>{data.name}</h2>
                        {
                            data.parts.map(datas => (
                                <Part key={datas.id} name={datas.name} exercises={datas.exercises}/>
                            ))
                        }
                        <b>Total of {totals[id]} </b>
                    </div>
                ))
            }
        </div>
    )
}

export default Content