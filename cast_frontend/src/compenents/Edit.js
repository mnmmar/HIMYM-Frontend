import React, { useState } from 'react';

const Edit = (props) => {

    const [person, setPerson] = useState({...props.person})

    const handleChange = (event) => {
        setPerson({...person, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(person)
    }

    return(
        <>
            <details>
                <summary>Edit!</summary>

                <form onSubmit={handleSubmit}>

                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={person.name}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Age: </label>
                    <input
                        type="number"
                        name="age"
                        value={person.age}
                        onChange={handleChange}
                    />
                    <br />

                    <label>First Appearance: </label>
                    <input
                        type="number"
                        name="first_episode"
                        value={person.first_episode}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Status: </label>
                    <input
                        type="text"
                        name="status"
                        value={person.status}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Relationship Status: </label>
                    <input
                        type="text"
                        name="relationship_status"
                        value={person.relationship_status}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Image Link: </label>
                    <input
                        type="text"
                        name="image_link"
                        value={person.image_link}
                        onChange={handleChange}
                    />
                    <br />

                    <input type="submit" />
                </form>
                <button onClick={props.handleDelete} value={props.person.id}>Delete Person</button>
            </details>
        </>
    )
}

export default Edit