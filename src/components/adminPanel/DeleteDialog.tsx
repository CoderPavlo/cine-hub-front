import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

interface DeleteDialog {
    open: boolean,
    onClose: () => void,
    onClick: () => void,
    name?: string,
    type: 'cinema' | 'hall' | 'session';
}
const DeleteDialog = ({ open, onClose, onClick, name, type }: DeleteDialog) => {
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClick} autoFocus variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog