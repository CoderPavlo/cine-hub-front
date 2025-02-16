import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material"
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ErrorDisplay from "../common/ErrorDisplay";

interface DeleteDialog {
    open: boolean,
    onClose: () => void,
    onClick: () => void,
    name?: string,
    type: 'cinema' | 'hall' | 'session';
    loading?:boolean,
    error?: FetchBaseQueryError | SerializedError,
}
const DeleteDialog = ({ open, onClose, onClick, name, type, loading, error }: DeleteDialog) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Delete selected ${type}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {name}
                </DialogContentText>
                <ErrorDisplay error={error} sx={{ mt: 1 }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button loading={loading} onClick={onClick} autoFocus variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog