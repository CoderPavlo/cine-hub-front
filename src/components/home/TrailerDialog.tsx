import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, DialogContent, Typography, useTheme, Box } from '@mui/material'

import { themoviedbAPI } from '../../store/api/themoviedb';

interface TrailerDialogProps {
    id?: number,
    onClose: () => void,
    open: boolean,
}
export default function TrailerDialog({ id, onClose, open }: TrailerDialogProps) {
    const theme = useTheme();
    const { data, error } = themoviedbAPI.useFetchTrailerQuery(id);
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            slotProps={{
                paper: {
                    sx: {
                        background: theme.palette.background.paper,
                        width: { xs: '100%', md: '70%' },
                        maxWidth: '100%',
                    }
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Movie Trailer
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
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: 2,
                        overflow: "hidden",
                        alignSelf: "center",
                    }}
                >
                    {error ?
                        <Typography variant='h6' color='error' textAlign='center'>An error occurred while loading</Typography> :
                        <>
                            {data && data.results[0] &&
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${data.results[0].key}`}
                                    allowFullScreen
                                    title="Movie Trailer"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        border: 0,
                                    }}
                                />
                            }
                        </>
                    }

                </Box>
            </DialogContent>
        </Dialog >
    )
}
