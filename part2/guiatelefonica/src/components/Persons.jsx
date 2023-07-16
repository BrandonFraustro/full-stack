import React from "react";

const Persons = (props) => {
    //console.log("Persons: ", props.newSearch);
    return (
        <div>
            <ul>
            {
              props.newSearch.map(person =>
                <li key={person.name}>{person.name} {person.number}</li>  
              )
            }
          </ul>
        </div>
    )
}

export default Persons