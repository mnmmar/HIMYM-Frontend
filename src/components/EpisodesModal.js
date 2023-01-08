import React from 'react';
import { Box, Modal, Typography, Rating, Card } from '@mui/material';
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
                        <CardMedia component="img" height="100" image={episodeDetails?.image?.medium} />
                        <Typography sx={{ m: 2 }}>Season:{episodeDetails.season}</Typography>
                        <Typography > Episode:{episodeDetails.number}</Typography>
                        <Typography sx={{ m: 2 }}> Name:{episodeDetails.name}</Typography>
                        <Typography>Air Date: {episodeDetails.airdate}</Typography>
                        <Rating value={episodeDetails.rating?.average} size="small" readOnly max={10} precision={0.5} />
                        <Typography sx={{ mb: 2 }}>Summary: {episodeDetails.summary}</Typography>
                    </Card>
                </Box>
            </Modal>
        </>
    );
}

