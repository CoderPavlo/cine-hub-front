import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Cinema } from "../../models/tables";

interface CinemaDialogProps {
    open: boolean;
    onClose: () => void;
    cinema?: Cinema;
}

const CinemaSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),
});

const CinemaDialog = ({ open, onClose, cinema }: CinemaDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{cinema? "Edit Cinema" : "Add New Cinema"}</DialogTitle>
            <Formik
                initialValues={cinema ? cinema : {location: ''}}
                validationSchema={CinemaSchema}
                onSubmit={(values) => {
                    onClose();
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

export default CinemaDialog;
