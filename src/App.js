import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Add from './components/Add';
import Edit from './components/Edit';
import Show from './components/Show';
import { AppBar, Button, Box, Card, CardContent, Grid, Container, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Toolbar, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CardMedia from '@mui/material/CardMedia';


// const axios = axios.create({ baseURL: 'https://serene-tundra-26070.herokuapp.com/api' })
const drawerWidth = 240;

//FROM MUI DOCS https://mui.com/material-ui/react-drawer/#full-height-navigation





const App = () => {

  let [cast, setCast] = useState([])

  const getComments = () => {
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

  const [episodes, setEpisodes] = useState([])

  const [showEpisodes, setShowEpisodes] = useState(true)
  const [showCast, setShowCast] = useState(false)
  // const [showImage, setShowImage] = useState(true)

  const episodeVisibility = () => {
    setShowCast(false)
    setShowEpisodes(true)
  }

  const castVisibility = () => {
    setShowCast(true)
    setShowEpisodes(false)
  }
  // const getEpisodes = (event) => {
  //   event.preventDefault()
  //   axios
  //     .get('https://api.tvmaze.com/shows/171/episodes')
  //     .then((response) => {
  //       setEpisodes(response.data)
  //     })
  // }
  const getCast = () => {
    axios
      .get('https:api.tvmaze.com/shows/171/cast')
      .then((response) => { setCast(response.data) })
  }

  useEffect(() => {
    getCast()

    axios
      .get('https://api.tvmaze.com/shows/171/episodes')
      .then((response) => {
        setEpisodes(response.data)
      })
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
              <Button variant={showEpisodes ? "contained" : "outlined"} onClick={episodeVisibility}>Episodes</Button>

              <Button variant={showCast ? "contained" : "outlined"} onClick={castVisibility}>Cast</Button>

            </List>
            <Divider />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />

          <Add handleCreate={handleCreate}></Add>

          {showEpisodes ? <>
            <Grid container sx={{ my: 4 }} spacing={4}>
              {episodes.map((episode, index) => {
                return (

                  <Grid item xs={12} sm={6} md={4} key={episode._id}>
                    <Card sx={{ my: 1, height: '100%', display: 'flex', flexDirection: 'columns' }} elevation={6} >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography sx={{ mb: 2 }}>Season: {episode.season} Episode: {episode.number}</Typography>
                        <Typography sx={{ mb: 2 }}>Name: {episode.name}</Typography>
                        <Typography sx={{ mb: 2 }}>Air Date: {episode.airdate}</Typography>
                        <CardMedia component="img" height="100" image={episode.image.medium} />

                      </CardContent>
                    </Card>
                  </Grid>
                )
              }
              )}
            </Grid>
          </> : <></>}

          {showCast ? <>
            <Grid container sx={{ my: 4 }} spacing={4}>
              {cast.map((actor, index) => {
                return (

                  <Grid item xs={12} sm={6} md={4} key={actor.person._id}>
                    <Card sx={{ my: 1, height: '100%', display: 'flex', flexDirection: 'columns' }} elevation={6} >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography sx={{ mb: 2 }}>Actor: {actor.person.name}</Typography>
                        <Typography sx={{ mb: 2 }}>Character: {actor.character.name}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              }
              )}
            </Grid>
          </> : <></>}



        </Box>
      </Box>

      <div>

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
