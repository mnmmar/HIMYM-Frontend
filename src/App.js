import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Add from './components/Add';
import EditModal from './components/EditModal';
import EpisodesModal from './components/EpisodesModal';
import { AppBar, Rating, Button, Box, Card, CardContent, Grid, Container, Divider, Drawer, List, Toolbar, Stack, Typography, CardActions } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia';


const drawerWidth = 240;

const App = () => {

  let [blog, setBlog] = useState([])
  const [cast, setCast] = useState([])
  const [episodeDetails, setEpisodeDetails] = useState({})


  //---------
  //EPISODES Modal
  //----------

  const [showEpisodeModal, setEpisodeModal] = useState(false)

  const showEpiModal = () => {
    setEpisodeModal(true)
  }


  //---------
  //EDIT Modal
  //----------
  const [showModal, setShowModal] = useState(false)
  const [blogEditItem, setBlogItem] = useState({})

  const editBlog = (blogItem) => () => {
    setShowModal(true)
    setBlogItem(blogItem)
  }

  const getBlog = () => {
    axios
      .get('https://powerful-savannah-49295.herokuapp.com/api/blog')
      .then(
        (response) => setBlog(response.data),
        (err) => console.log(err)
      )
  }



  const handleCreate = (addPerson) => {
    axios
      .post('https://powerful-savannah-49295.herokuapp.com/api/blog', addPerson)
      .then((response) => {
        console.log(response)
        getBlog()
      })
  }

  const handleDelete = (blogId) => {
    axios
      .delete('https://powerful-savannah-49295.herokuapp.com/api/blog/' + blogId)
      .then((response) => {

        getBlog()
        setShowModal(false)
      })
  }

  const handleUpdate = (editBlog) => {
    axios
      .put('https://powerful-savannah-49295.herokuapp.com/api/blog/' + editBlog.id, editBlog)
      .then((response) => {
        getBlog()
        setShowModal(false)
      })
  }

  const [episodes, setEpisodes] = useState([])

  const [showEpisodes, setShowEpisodes] = useState(true)
  const [showCast, setShowCast] = useState(false)
  const [showBlog, setShowBlog] = useState(false)

  const episodeVisibility = () => {
    setShowCast(false)
    setShowEpisodes(true)
    setShowBlog(false)
  }

  const castVisibility = () => {
    setShowCast(true)
    setShowEpisodes(false)
    setShowBlog(false)
  }

  const blogVisibility = () => {
    setShowCast(false)
    setShowEpisodes(false)
    setShowBlog(true)
  }
  const getEpisodes = () => {
    axios
      .get('https://api.tvmaze.com/shows/171/episodes')
      .then((response) => {
        setEpisodes(response.data)
      })
  }
  const getCast = () => {
    axios
      .get('https://api.tvmaze.com/shows/171/cast')
      .then((response) => {
        setCast(response.data)
      })
  }

  const getDetails = (episodeId) => {
    console.log(episodeId)
    axios
      .get('https://api.tvmaze.com/episodes/' + episodeId)
      .then((response) => {
        setEpisodeDetails(response.data)

      })
    showEpiModal()
    setEpisodeModal(true)
  }

  useEffect(() => {
    getCast()
    getEpisodes()
    getBlog()
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
          {/* These two are for spacing purposes, basically empty div's */}
          <Toolbar />
          <Toolbar />

          <Box sx={{ overflow: 'auto', m: 4 }}>
            <List>
              <Button sx={{ m: 3 }} variant={showEpisodes ? "contained" : "outlined"} onClick={episodeVisibility}>Episodes</Button>
              <Button sx={{ m: 3 }} variant={showCast ? "contained" : "outlined"} onClick={castVisibility}>Cast</Button>
            </List>
            <Divider />
            <List>
              <Button sx={{ m: 3 }} variant={showBlog ? "contained" : "outlined"} onClick={blogVisibility}>Blog</Button>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />



          {showEpisodes ? <>
            <Grid container sx={{ my: 4 }} spacing={4}>
              {episodes.map((episode, index) => {
                return (

                  <Grid item xs={12} sm={6} md={4} key={episode._id}>
                    <Card sx={{ my: 1, height: '100%', flexDirection: 'columns' }} elevation={6} >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography sx={{ mb: 2 }}>Season: {episode.season} Episode: {episode.number}</Typography>
                        <Typography sx={{ mb: 2 }}>Name: {episode.name}</Typography>
                        <CardMedia component="img" height="100" image={episode.image.medium} />
                        <Rating value={episode.rating.average} readOnly max={10} precision={0.5} />

                        <Typography sx={{ mb: 2 }}>Rating: {episode.rating.average}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => { showEpiModal(); getDetails(episode.id) }} >Details</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              }
              )}
            </Grid>
          </> : <></>
          }
          <EpisodesModal
            episodeDetails={episodeDetails}
            open={showEpisodeModal} // false
            onClose={() => { setEpisodeModal(false) }} />


          {showCast ? <>
            <Grid container sx={{ my: 4 }} spacing={4}>
              {cast.map((actor, index) => {
                return (

                  <Grid item xs={12} sm={6} md={4} key={actor.person._id}>
                    <Card sx={{ my: 1, height: '100%', width: 300, display: 'flex', flexDirection: 'columns' }} elevation={6} >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography sx={{ mb: 2 }}>Character: {actor.character.name}</Typography>
                        <Typography sx={{ mb: 2 }}>Actor: {actor.person.name}</Typography>
                        <CardMedia component="img" height="100" sx={{ maxWidth: 180, margin: 'auto' }} image={actor.character.image.medium} />
                      </CardContent>
                    </Card>
                  </Grid>
                )
              }
              )}
            </Grid>
          </> : <></>}

          {showBlog ? <>
            <Add handleCreate={handleCreate}></Add>
            <Stack container direction="column-reverse">
              {blog.map((blogEntry, index) => {
                return (
                  <Grid item xs={12} key={blogEntry._id}>
                    <Card elevation={6} sx={{ borderRadius: '60px' }}>
                      <CardContent align="left">
                        <Typography >Name: {blogEntry.name}</Typography>
                        <Typography> Topic: {blogEntry.topic}</Typography>
                        <Typography>Comment: {blogEntry.post}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={editBlog(blogEntry)}>Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })}

            </Stack>
          </> : <></>}


          <EditModal open={showModal}
            onClose={() => { setShowModal(false) }}
            initialBlog={blogEditItem}
            onDelete={handleDelete}
            onSubmit={handleUpdate} />

        </Box>
      </Box>

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

    </>
  )
}

export default App;
