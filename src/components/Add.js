import React, { useState } from 'react';
import { FormGroup, Typography, TextField, Button, Grid, Paper } from '@mui/material';





const Add = (props) => {
  let emptyBlog = { name: '', topic: '', image_link: '', post: '' }
  const [blog, setBlog] = useState(emptyBlog)

  const handleChange = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(blog)
    setBlog(emptyBlog)
  }

  return (
    <>
      <Grid align="center">
        <Paper align="left" sx={{ width: { sm: 750 }, }} elevation={10}>
          <FormGroup>
            <Typography sx={{ mt: 2, p: 2 }} variant="h5"><strong>Discuss HIMYM with Others!</strong></Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ m: 1, p: 1, width: 300 }}
                onChange={handleChange}
                id="outlined-basic"
                name="name"
                label="Your Name"
                variant="outlined"
                value={blog.name} />
              <TextField sx={{ width: 700, m: 1, p: 1 }}
                onChange={handleChange}
                multiline maxRows={2}
                id="outlined-multiline-flexible"
                name="topic"
                label="Topic"
                variant="outlined"
                value={blog.topic} /><br />
              <TextField sx={{ width: 700, m: 1, p: 1 }}
                onChange={handleChange}
                multiline maxRows={2}
                id="outlined-multiline-flexible"
                name="image"
                label="Image Link"
                variant="outlined"
                value={blog.image_link} /><br />
              <TextField
                sx={{ width: 700, m: 1, p: 1 }}
                rows={4}
                multiline maxRows={8}
                onChange={handleChange}
                id="outlined-multiline-flexible"
                name="post"
                label="Your Thoughts"
                variant="outlined"
                value={blog.post} /><br />
              <Button
                sx={{ m: 2 }}
                variant="contained"
                type="submit"
                color="success"
              >Submit Post</Button>
            </form>
          </FormGroup>
        </Paper>
      </Grid>
{/* 
      <details>
        <summary>Add A New Post!</summary>

        <form onSubmit={handleSubmit}>

          <label>Name: </label>
          <br />
          <input
            type="text"
            name="name"
            value={blog.name}
            onChange={handleChange}
          />
          <br />

          <label>Age: </label>
          <br />
          <input
            type="number"
            name="age"
            value={blog.age}
            onChange={handleChange}
          />
          <br />

          <label>First Appearance: </label>
          <br />
          <input
            type="number"
            name="first_episode"
            value={blog.first_episode}
            onChange={handleChange}
          />
          <br />

          <label>Status: </label>
          <br />
          <input
            type="text"
            name="status"
            value={blog.status}
            onChange={handleChange}
          />
          <br />

          <label>Relationship Status: </label>
          <br />
          <input
            type="text"
            name="relationship_status"
            value={blog.relationship_status}
            onChange={handleChange}
          />
          <br />

          <label>Image Link: </label>
          <br />
          <input
            type="text"
            name="image_link"
            value={blog.image_link}
            onChange={handleChange}
          />
          <br />

          <input type="submit" />
        </form>
      </details> */}

    </>
  )
}

export default Add
