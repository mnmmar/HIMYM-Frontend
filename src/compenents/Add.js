import React, { useState } from 'react';


const Add = (props) => {
  let emptyPerson = { name: '', age: '', first_episode: '', status: '', relationship_status: '', image_link: '' }
  const [person, setPerson] = useState(emptyPerson)

  const handleChange = (event) => {
    setPerson({...person, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(person)
  }
  return (
    <>
    <details>
        <summary>Add A New Person!</summary>

            <form onSubmit={handleSubmit}>
                
            <label>Name: </label>
            <br />
            <input 
                type="text" 
                name="name" 
                value={person.name} 
                onChange={handleChange}
            />
            <br />

            <label>Age: </label>
            <br />
            <input 
                type="number" 
                name="age" 
                value={person.age} 
                onChange={handleChange}
            />
            <br />

            <label>First Appearance: </label>
            <br />
            <input 
                type="number" 
                name="first_episode" 
                value={person.first_episode} 
                onChange={handleChange}
                />
            <br />

            <label>Status: </label>
            <br />
            <input 
                type="text" 
                name="status" 
                value={person.status} 
                onChange={handleChange}
            />
            <br />

            <label>Relationship Status: </label>
            <br />
            <input 
                type="text" 
                name="relationship_status" 
                value={person.relationship_status} 
                onChange={handleChange}
            />
            <br />

            <label>Image Link: </label>
            <br />
            <input 
                type="text" 
                name="image_link" 
                value={person.image_link} 
                onChange={handleChange}
            />
            <br />
            
            <input type="submit"/>
        </form>
    </details>
      
    </>
  )
}

export default Add
