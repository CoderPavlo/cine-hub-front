import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, DialogContent, Stack, Typography, useTheme } from '@mui/material'
import { QRCodeSVG } from 'qrcode.react'
import { Ticket } from '../../models/tickets';

interface TicketDialogProps {
    ticket?: Ticket,
    onClose: () => void,
    open: boolean,
}
export default function TicketDialog({ ticket, onClose, open }: TicketDialogProps) {
    const theme = useTheme();
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            slotProps={{
                paper: {
                    sx: {
                        background: theme.palette.background.paper
                    }
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Ticket
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <Close />
            </IconButton>
            <DialogContent dividers>
                {ticket &&
                    <Stack direction='row'>
                        <QRCodeSVG value={ticket.id} size={300} bgColor={theme.palette.background.paper} fgColor={theme.palette.text.primary} />
                        <Stack direction='column' ml={1} textAlign='center' spacing={1}>
                            <Typography variant="h5">{ticket.title}</Typography>
                            <Typography variant="body1" color="textSecondary">
                                {ticket.date} at {ticket.time}
                            </Typography>
                            <Typography variant="body1">
                                Hall: {ticket.hall}, Row: {ticket.row_number}, Seat: {ticket.seat_number}
                            </Typography>
                            <Typography variant="body1">
                                Type: {ticket.type}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Price: ${ticket.price}
                            </Typography>
                        </Stack>
                    </Stack>
                }
            </DialogContent>
        </Dialog>
    )
}
