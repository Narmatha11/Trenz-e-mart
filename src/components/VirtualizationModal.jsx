import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const VirtualizationModal = ({ open, onClose, onConfirm, product }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Try It On?</DialogTitle>
      <DialogContent>
        <Typography>
          Do you want to try <strong>{product?.name}</strong> on your avatar?
        </Typography>
        <img
          src={product?.image}
          alt={product?.name}
          style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">No</Button>
        <Button onClick={onConfirm} color="primary" variant="contained">Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VirtualizationModal;