import { Autocomplete, Box, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'

const films = [
    { id: 1, name: "Inception" },
    { id: 2, name: "Interstellar" },
    { id: 3, name: "The Dark Knight" },
    { id: 4, name: "The Matrix" },
    { id: 5, name: "Pulp Fiction" },
    { id: 6, name: "Forrest Gump" },
    { id: 7, name: "The Shawshank Redemption" },
    { id: 8, name: "Gladiator" },
    { id: 9, name: "Titanic" },
    { id: 10, name: "The Lord of the Rings: The Return of the King" }
];

const FilmStats = () => {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Film Statistics</Typography>
                <Autocomplete
                    // value={values.cinema}
                    // onChange={(event, newValue) => {
                    //     setFieldValue('cinema', newValue);
                    // }}
                    sx={{ minWidth: '45%' }}
                    options={films}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params}
                        label="Film" />}
                    noOptionsText='There are no films'
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />
            </Box>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                <ListItemButton divider>
                    <ListItemText primary="Now in release" />
                    <Typography variant="h5">Yes</Typography>
                </ListItemButton>
                <ListItemButton divider>
                    <ListItemText primary="Number of sessions" />
                    <Typography variant="h5">100</Typography>
                </ListItemButton>
                <ListItemButton divider>
                    <ListItemText primary="Tickets Sold" />
                    <Typography variant="h5">2000</Typography>
                </ListItemButton>
                <ListItemButton divider>
                    <ListItemText primary="Percentage of tickets sold" />
                    <Typography variant="h5">80 %</Typography>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="Revenue" />
                    <Typography variant="h5">50000 $</Typography>
                </ListItemButton>
            </List>
        </Box>
    )
}

export default FilmStats