import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Add from './components/Add';
import EditModal from './components/EditModal';
import { AppBar, Button, Box, Card, CardContent, Grid, Container, Divider, Drawer, List, Toolbar, Typography, CardActions } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia';


// const axios = axios.create({ baseURL: 'https://serene-tundra-26070.herokuapp.com/api' })
const drawerWidth = 240;

const App = () => {

  let [blog, setBlog] = useState([])
  const [cast, setCast] = useState([])

  //---------
  //EDIT Modal
  //----------
  const [showModal, setShowModal] = useState(false)
  const [blogEditItem, setBlogItem] = useState({})

  const editBlog = (blogItem) => (event) => {
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

  const handleDelete = (event) => {
    axios
      .delete('https://powerful-savannah-49295.herokuapp.com/api/blog/' + event.target.value)
      .then((response) => {
        getBlog()
      })
  }

  const handleUpdate = (editBlog) => {
    axios
      .put('https://powerful-savannah-49295.herokuapp.com/api/blog/' + editBlog.id, editBlog)
      .then((response) => {
        getBlog()
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
          
          <Toolbar />
          <Toolbar />

          <Box sx={{ overflow: 'auto', m: 4 }}>
            <List>
              <Button sx={{m:3}} variant={showEpisodes ? "contained" : "outlined"} onClick={episodeVisibility}>Episodes</Button>
              <Button sx={{m:3}} variant={showCast ? "contained" : "outlined"} onClick={castVisibility}>Cast</Button>
            </List>
            <Divider />
            <List>
              <Button sx={{m:3}} variant={showBlog ? "contained" : "outlined"} onClick={blogVisibility}>Blog</Button>
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

          {showBlog ? <>
            <Add handleCreate={handleCreate}></Add>
            <Grid container>
              {blog.map((comment, index) => {
                return (
                  <Grid item xs={12} key={comment._id}>
                    <Card elevation={6}>
                      <CardContent align="left">
                        <Typography >Name: {comment.name}</Typography>
                        <Typography> Topic: {comment.topic}</Typography>
                        <Typography>Comment: {comment.post}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={editBlog(comment)}>Edit</Button>

                      </CardActions>
                    </Card>
                  </Grid>
                )
              })}

            </Grid>
          </> : <></>}

          <EditModal open={showModal}
            onClose={() => { setShowModal(false) }}
            blog={blogEditItem}
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
