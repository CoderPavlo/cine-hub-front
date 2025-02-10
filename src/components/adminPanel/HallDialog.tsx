import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Autocomplete, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Cinema, Hall } from "../../models/tables";

interface CinemaDialogProps {
    open: boolean;
    onClose: () => void;
    hall?: Hall;
}

const HallSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    rowCount: Yup.number().min(1, "Must be at least 1").required("Row count is required"),
    seatsPerRow: Yup.number().min(1, "Must be at least 1").required("Seats per row is required"),
    cinema: Yup.object().required("Cinema is required"),
});

const HallDialog = ({ open, onClose, hall }: CinemaDialogProps) => {
    const cinemas: Cinema[] = [
        { id: '1', location: 'Kyiv, Ocean Plaza' }
    ];
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{hall ? "Edit Hall" : "Add New Hall"}</DialogTitle>
            <Formik
                initialValues={hall ? hall : {
                    name: '',
                    rowCount: '',
                    seatsPerRow: '',
                    cinema: undefined,
                }}
                validationSchema={HallSchema}
                onSubmit={(values) => {
                    onClose();
                }}
            >
                {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Field
                                as={TextField}
                                label="Name"
                                name="name"
                                fullWidth
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <Field
                                as={TextField}
                                label="Row Count"
                                name="rowCount"
                                type="number"
                                fullWidth
                                error={touched.rowCount && Boolean(errors.rowCount)}
                                helperText={touched.rowCount && errors.rowCount}
                            />
                            <Field
                                as={TextField}
                                label="Seats Per Row"
                                name="seatsPerRow"
                                type="number"
                                fullWidth
                                error={touched.seatsPerRow && Boolean(errors.seatsPerRow)}
                                helperText={touched.seatsPerRow && errors.seatsPerRow}
                            />
                            <Box>
                                <Autocomplete
                                    value={values.cinema}
                                    onChange={(event, newValue) => {
                                        setFieldValue('cinema', newValue);
                                    }}
                                    options={cinemas}
                                    getOptionLabel={(option) => option.location}
                                    renderInput={(params) => <TextField {...params}
                                        error={Boolean(touched.cinema && errors.cinema)}
                                        label="Cinema" />}
                                    noOptionsText='There are no cinema'
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                />
                                {Boolean(touched.cinema && errors.cinema) &&
                                    <Typography variant='caption' color='error' mt='3px' ml='14px'>
                                        {touched.cinema && errors.cinema as string}
                                    </Typography>
                                }
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default HallDialog;
