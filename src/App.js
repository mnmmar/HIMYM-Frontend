import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Add from './compenents/Add';
import Edit from './compenents/Edit';
import Show from './compenents/Show';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const App = () => {

  let [cast, setCast] = useState([])

  const getCast = () => {
    axios
      .get('http://localhost:8000/api/cast')
      .then(
        (response) => setCast(response.data),
        (err) => console.log(err)
      )
  }

  const handleCreate = (addPerson) => {
    axios
      .post('http://localhost:8000/api/cast', addPerson)
      .then((response) => {
        console.log(response)
        getCast()
      })
  }

  const handleDelete = (event) => {
    axios
      .delete('http://localhost:8000/api/cast/' + event.target.value)
      .then((response) => {
        getCast()
      })
  }

  const handleUpdate = (editPerson) => {
    axios
      .put('http://localhost:8000/api/cast/' + editPerson.id, editPerson)
      .then((response) => {
        getCast()
      })
  }

  useEffect(() => {
    getCast()
  }, [])

  return (
    <>
      <Add handleCreate={handleCreate}></Add>
      <div>


        {cast.map((person) => {
          return (
            <div>
              <h4>Name: {person.name}</h4>
              <img src={person.image_link}></img>
              <Show person={person}></Show>
              <Edit handleDelete={handleDelete} person={person} handleUpdate={handleUpdate}></Edit>

            </div>
          )
        })}
        <Box component="footer"
          sx={{
            py: 3, px: 2, mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[400]
                : theme.palette.grey[800],
          }}>
          <Container maxWidth="sm">
            <Typography variant="body1">
              Brought to you by A.Capace, M.Steinberg, M.M.Min
            </Typography>
          </Container>
        </Box>
      </div>
    </>
  )
}

export default App;
