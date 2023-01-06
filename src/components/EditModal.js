import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import { Box, Button, FormGroup, Modal, TextField, Typography } from '@mui/material';

const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export default function EditModal({ open, onClose, onSubmit, onDelete, initialBlog }) {

    const [blog, setBlog] = useState({})

    const handleChange = (event) => {
        setBlog({ ...blog, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(blog)
        onSubmit(blog)
    }

    // const handleUpdate = (editBlog) => {
    //     console.log(editBlog)
    //     axios
    //         .put('https://powerful-savannah-49295.herokuapp.com/api/blog/' + editBlog.id, editBlog)
    //         .then((response) => {
    //             setBlog()
    //         })
    // }

    const handleDelete = (event) => {
        onDelete(blog.id)
        // axios
        //     .delete('https://powerful-savannah-49295.herokuapp.com/api/blog/' + event.target.value)
        //     .then((response) => {
        //         setBlog()
        //         onDelete()
        //     })
    }

    useEffect(() => {
        setBlog(initialBlog)
    }, [initialBlog])


    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalstyle}>
                <FormGroup>
                    <Typography sx={{ mt: 2, p: 2 }} variant="h5"><strong>Edit your Post</strong></Typography>
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
                        <Button size="small" onClick={handleDelete}>Delete Post</Button>
                    </form>
                </FormGroup>
            </Box>
        </Modal>
    )
}




