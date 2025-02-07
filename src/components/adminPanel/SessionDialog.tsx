import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Autocomplete, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Cinema, Hall, Session } from "../../models/tables";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { cinemas, halls } from "./SessionsTab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FilmField from "./FilmField";
interface CinemaDialogProps {
    open: boolean;
    onClose: () => void;
    session?: Session;
    filter: {
        cinema: Cinema | null,
        hall: Hall | null,
        date: Dayjs | null,
    }
}

const SessionSchema = Yup.object().shape({
    startTime: Yup.object().required("Start time is required"),
    startDate: Yup.object().required("Start date is required"),
    endDate: Yup.object().required("End date is required"),
    formatType: Yup.string().required("Format type is required"),
    price: Yup.number().min(0, "Price must be at least 0").required("Price is required"),
    filmId: Yup.number().required("Film is required"),
    hall: Yup.object().required("Hall is required"),
    cinema: Yup.object().required("Cinema is required"),

});

const SessionDialog = ({ open, onClose, session, filter }: CinemaDialogProps) => {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{session ? "Edit Session" : "Add New Session"}</DialogTitle>
            <Formik
                initialValues={session ? { ...session, cinema: session.hall.cinema, startDate: dayjs(session.startTime), endDate: dayjs(session.startTime), startTime: dayjs(session.startTime) } : {
                    cinema: filter.cinema,
                    hall: filter.hall,
                    startTime: null,
                    endTime: '',
                    formatType: '',
                    price: '',
                    filmId: '',
                    filmName: '',
                    startDate: null,
                    endDate: null,

                }}
                validationSchema={SessionSchema}
                onSubmit={(values) => {
                    onClose();
                }}
            >
                {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {/* <Field
                                value={values.filmName}
                                as={TextField}
                                label="Film"
                                fullWidth
                                error={touched.filmId && Boolean(errors.filmId)}
                                helperText={touched.filmId && errors.filmId}
                            /> */}
                            <FilmField
                                value={values.filmName}
                                error={touched.filmId && Boolean(errors.filmId)}
                                helperText={touched.filmId && errors.filmId as string}
                                idOnChange={(id)=>setFieldValue('filmId', id)}
                                nameOnChange={(name)=>setFieldValue('filmName', name)}
                            />
                            <Field
                                as={TextField}
                                label="Format Type"
                                name="formatType"
                                fullWidth
                                error={touched.formatType && Boolean(errors.formatType)}
                                helperText={touched.formatType && errors.formatType}
                            />
                            <Field
                                as={TextField}
                                label="Price"
                                name="price"
                                type="number"
                                fullWidth
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                                <Box display='flex' flexDirection='row' gap={2}>
                                    <DatePicker
                                        label='Start Date'
                                        value={values.startDate}
                                        onChange={(value) => setFieldValue('startDate', value)}
                                        views={['year', 'month', 'day']}
                                        format="DD.MM.YYYY"
                                        shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: touched.startDate && Boolean(errors.startDate),
                                                helperText: touched.startDate && errors.startDate as string,
                                            },
                                            toolbar: { toolbarFormat: 'ddd DD MMM', hidden: false },
                                        }}
                                    />
                                    <Typography variant='h3'>-</Typography>
                                    <DatePicker
                                        label='End Date'
                                        value={values.endDate}
                                        onChange={(value) => setFieldValue('endValue', value)}
                                        views={['year', 'month', 'day']}
                                        format="DD.MM.YYYY"
                                        shouldDisableDate={(date) => date.isBefore(values.startDate || dayjs(), 'day')}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: touched.endDate && Boolean(errors.endDate),
                                                helperText: touched.endDate && errors.endDate as string,
                                            },
                                            toolbar: { toolbarFormat: 'ddd DD MMM', hidden: false },
                                        }}
                                    />
                                </Box>
                                <TimePicker
                                    label="Time"
                                    value={values.startTime}
                                    onChange={(newValue) => setFieldValue('startTime', newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: touched.startTime && Boolean(errors.startTime),
                                            helperText: touched.startTime && errors.startTime as string,
                                        },
                                        toolbar: { hidden: false },
                                    }}
                                    ampm={false}
                                />
                            </LocalizationProvider>
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
                            <Box>
                                <Autocomplete
                                    disabled={values.cinema === null}
                                    value={values.hall}
                                    onChange={(event, newValue) => {
                                        setFieldValue('hall', newValue);
                                    }}
                                    options={halls}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params}
                                        error={Boolean(touched.hall && errors.hall)}
                                        label="Hall" />}
                                    noOptionsText='There are no halls'
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                />
                                {Boolean(touched.hall && errors.hall) &&
                                    <Typography variant='caption' color='error' mt='3px' ml='14px'>
                                        {touched.hall && errors.hall as string}
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

export default SessionDialog;
