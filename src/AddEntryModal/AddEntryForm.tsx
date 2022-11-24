import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { HealthCheckRatingOption, SelectField, TextField } from "./EntryFormFields";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state/state";



export type EntryFormValues = Omit<HealthCheckEntry, "id">;

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label:"Healthy" },
  { value: HealthCheckRating.LowRisk, label:"Low risk" },
  { value: HealthCheckRating.HighRisk, label:"High risk" },
  { value: HealthCheckRating.CriticalRisk, label:"Critical risk" }
];

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }

  export const AddEntryForm = ({onSubmit, onCancel}: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
      <Formik
      initialValues={{
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy,
        description: "",
        date: "",
        specialist: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        
        const requiredError = "Field is required";
        const malformattedDate = "Fill in date as \"YYYY-MM-DD\"";
        const errors: { [field: string]: string } = {};
        if (!values.healthCheckRating) {
          errors.name = requiredError;
        }
        if (!values.description) {
          errors.ssn = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = malformattedDate;
        }
        return errors;
      }}
    >
      {({isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
        <Form className="form ui">
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
            />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <SelectField label="Health rating" name="healthCheckRating" options={healthCheckRatingOptions} />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
            Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
              float: "right",
              }}
              type="submit"
              variant="contained"
              disabled={!dirty || !isValid}
            >
            Add
            </Button>
          </Grid>
        </Grid>
        </Form>
        );
        }}
      </Formik>
    );
  };

  export default AddEntryForm;