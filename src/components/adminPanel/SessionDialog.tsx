import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Autocomplete, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Cinema, Hall, Session } from "../../models/tables";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FilmField from "./FilmField";
import serverAPI from "../../store/api/server";
import { useState } from "react";
import ErrorDisplay from "../common/ErrorDisplay";
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

const SessionDialog = ({ open, onClose, session, filter }: CinemaDialogProps) => {
    const [cinemaId, setCinemaId] = useState(filter.cinema?.id);
    const { data: cinemas, isLoading: cinemasLoading } = serverAPI.useFetchCinemasQuery({ page: 1, itemsPerPage: 10000 });
    const { data: halls, isLoading: hallsLoading } = serverAPI.useFetchHallsQuery({ page: 1, itemsPerPage: 10000, cinemaId: cinemaId });
    const [create, { isLoading: isLoadingCreate, error: errorCreate }] = serverAPI.useCreateSessionsMutation();
    const [update, { isLoading: isLoadingUpdate, error: errorUpdate }] = serverAPI.useUpdateSessionMutation();

    const SessionSchema = Yup.object().shape({
        startTime: Yup.object().required("Start time is required"),
        startDate: Yup.object().required("Start date is required"),
        formatType: Yup.string().required("Format type is required"),
        price: Yup.number().min(0, "Price must be at least 0").required("Price is required"),
        filmId: Yup.number().required("Film is required"),
        hall: session ? Yup.mixed().nullable() : Yup.object().required("Hall is required"),
        cinema: session ? Yup.mixed().nullable() : Yup.object().required("Cinema is required"),

    });
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{session ? "Edit Session" : "Add New Session"}</DialogTitle>
            <Formik
                initialValues={{
                    cinema: filter.cinema,
                    hall: filter.hall,
                    startTime: session ? dayjs(session.startTime) : null,
                    formatType: session?.formatType || '',
                    price: session?.price || '',
                    filmId: session?.filmId || '',
                    filmName: session?.filmName || '',
                    startDate: session ? dayjs(session.startTime) : null,
                    endDate: null,
                    runtime: 1,
                }}
                validationSchema={SessionSchema}
                onSubmit={async (values) => {
                    if (!values.startDate || !values.startTime)
                        return;
                    dayjs();
                    const startDateTime = (values.startDate as Dayjs)
                        .hour(values.startTime.hour())
                        .minute(values.startTime.minute());
                    session ?
                        await update({
                            id: session.id,
                            startTime: startDateTime.toISOString(),
                            runtime: values.runtime,
                            formatType: values.formatType,
                            price: Number(values.price),
                            filmId: Number(values.filmId),
                            filmName: values.filmName,
                        }).then(() => {
                            if (errorUpdate === undefined) onClose();
                        }) :
                        await create({
                            startDateTime: startDateTime.toISOString(),
                            endDate: values.endDate ? (values.endDate as Dayjs).toISOString() : undefined,
                            runtime: values.runtime,
                            formatType: values.formatType,
                            price: Number(values.price),
                            filmId: Number(values.filmId),
                            filmName: values.filmName,
                            cinemaId: values.cinema ? (values.cinema as Cinema).id : '',
                            auditoriumId: values.hall ? (values.hall as Hall).id : '',
                        }).then(() => {
                            if (errorCreate === undefined) onClose()
                        })
                }}
            >
                {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <FilmField
                                value={values.filmName}
                                error={touched.filmId && Boolean(errors.filmId)}
                                helperText={touched.filmId && errors.filmId as string}
                                idOnChange={(id) => setFieldValue('filmId', id)}
                                nameOnChange={(name) => setFieldValue('filmName', name)}
                                runtimeOnChange={(runtime) => setFieldValue('runtime', runtime)}
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
                                    {!session && <>
                                        <Typography variant='h3'>-</Typography>
                                        <DatePicker
                                            label='End Date'
                                            value={values.endDate}
                                            onChange={(value) => setFieldValue('endDate', value)}
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
                                    </>}
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
                            {!session && <>
                                <Box>
                                    <Autocomplete
                                        value={values.cinema}
                                        onChange={(event, newValue) => {
                                            setFieldValue('cinema', newValue);
                                            setCinemaId(newValue?.id);
                                        }}
                                        options={cinemas ? cinemas.results : [] as Cinema[]}
                                        getOptionLabel={(option) => option.location}
                                        renderInput={(params) => <TextField {...params}
                                            error={Boolean(touched.cinema && errors.cinema)}
                                            label="Cinema" />}
                                        noOptionsText='There are no cinema'
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        loading={cinemasLoading}
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
                                        options={halls ? halls.results : [] as Hall[]}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params}
                                            error={Boolean(touched.hall && errors.hall)}
                                            label="Hall" />}
                                        noOptionsText='There are no halls'
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        loading={hallsLoading}
                                    />
                                    {Boolean(touched.hall && errors.hall) &&
                                        <Typography variant='caption' color='error' mt='3px' ml='14px'>
                                            {touched.hall && errors.hall as string}
                                        </Typography>
                                    }
                                </Box>
                            </>}
                            <ErrorDisplay error={session ? errorUpdate : errorCreate} sx={{ mt: 1 }} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button loading={isLoadingCreate || isLoadingUpdate} type="submit" variant="contained" color="primary">
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
