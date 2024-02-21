import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const useSnackbar = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const showSnackbar = (newMessage, newSeverity) => {
        setMessage(newMessage);
        setSeverity(newSeverity);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const SnackbarComponent = () => (
        <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ top: '100px', animationDuration: '0s', transitionDuration: '0s' }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );

    return [showSnackbar, SnackbarComponent];
};

export default useSnackbar;