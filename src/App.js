import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Add from './components/Add';
import Edit from './components/Edit';
import Show from './components/Show';
import { AppBar, Box, Container, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Toolbar, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


// const axios = axios.create({ baseURL: 'https://serene-tundra-26070.herokuapp.com/api' })
const drawerWidth = 240;

//FROM MUI DOCS https://mui.com/material-ui/react-drawer/#full-height-navigation





const App = () => {

  let [cast, setCast] = useState([])

  const getCast = () => {
    axios
      .get('https://serene-tundra-26070.herokuapp.com/api/cast')
      .then(
        (response) => setCast(response.data),
        (err) => console.log(err)
      )
  }

  const handleCreate = (addPerson) => {
    axios
      .post('https://serene-tundra-26070.herokuapp.com/api/cast', addPerson)
      .then((response) => {
        console.log(response)
        getCast()
      })
  }

  const handleDelete = (event) => {
    axios
      .delete('https://serene-tundra-26070.herokuapp.com/api/cast/' + event.target.value)
      .then((response) => {
        getCast()
      })
  }

  const handleUpdate = (editPerson) => {
    axios
      .put('https://serene-tundra-26070.herokuapp.com/api/cast/' + editPerson.id, editPerson)
      .then((response) => {
        getCast()
      })
  }

  useEffect(() => {
    getCast()
  }, [])
  //MUI THEMES


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h3" noWrap component="div">
              How I Met Your Mother
            </Typography>
            <Typography variant="h6" sx={{ p: 3 }}>All the details you never needed</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', m: 4 }}>
            <List>
              {['Episodes', 'Characters', 'Forum'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />

          <Add handleCreate={handleCreate}></Add>

        </Box>
      </Box>

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
