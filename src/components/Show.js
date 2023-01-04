import React from 'react'

const Show = (props) => {
    return(
        <>
            <details>
                <summary>Show Details</summary>
                <h4>Age: {props.person.age}</h4>
                <h4>Status: {props.person.status}</h4>
                <h4>Relationship Status: {props.person.relationship_status}</h4>
                <h4>First Appearance: Episode {props.person.first_episode}</h4>
            </details>
        </>
    )
}

export default Show