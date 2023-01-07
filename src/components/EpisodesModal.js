import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
// import axios from 'axios';
import { Box, Button, FormGroup, Paper, Modal, TextField, Typography, Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';


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

export default function EpisodesModal({ open, onClose, episodeDetails }) {


    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle}>
                    <Card>
                        <CardMedia height="140" image={episodeDetails.image} />
                        <Typography sx={{ mb: 2 }}>Season:{episodeDetails.season}</Typography>
                        <Typography sx={{ mt: 2 }}> Episode:{episodeDetails.number}</Typography>
                        <Typography sx={{ mt: 2 }}> Name:{episodeDetails.name}</Typography>
                        <Typography sx={{ mb: 2 }}>Air Date: {episodeDetails.airdate}</Typography>
                        <Typography sx={{ mb: 2 }}>Summary: {episodeDetails.summary}</Typography>
                        <Rating value={episodeDetails.rating} max={10} precision={0.5} readOnly />
                    </Card>
                </Box>
            </Modal >
        </>
    );
}

