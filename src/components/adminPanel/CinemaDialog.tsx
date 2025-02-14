import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Cinema } from "../../models/tables";
import serverAPI from "../../store/api/server";
import ErrorDisplay from "../common/ErrorDisplay";

interface CinemaDialogProps {
    open: boolean;
    onClose: () => void;
    cinema?: Cinema;
}

const CinemaSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),
});

const CinemaDialog = ({ open, onClose, cinema }: CinemaDialogProps) => {
    const [create, { isLoading: isLoadingCreate, error: errorCreate }] = serverAPI.useCreateCinemaMutation();
    const [update, { isLoading: isLoadingUpdate, error: errorUpdate }] = serverAPI.useUpdateCinemaMutation();
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{cinema ? "Edit Cinema" : "Add New Cinema"}</DialogTitle>
            <Formik
                initialValues={cinema ? cinema : { location: '' }}
                validationSchema={CinemaSchema}
                onSubmit={async (values) => {
                    cinema ?
                        await update({
                            id: cinema.id,
                            location: values.location
                        }).then(() => {
                            if (errorUpdate===undefined) onClose();
                        }) :
                        await create({
                            location: values.location
                        }).then(() => {
                            if (errorCreate===undefined) onClose()
                        })
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <DialogContent>
                            <Field
                                as={TextField}
                                label="Location"
                                name="location"
                                fullWidth
                                error={touched.location && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                            />
                            <ErrorDisplay error={cinema ? errorUpdate : errorCreate} sx={{ mt: 1 }} />
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

export default CinemaDialog;
