import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import {
  addContactThunk,
  updateContactThunk,
} from "../../redux/contacts/operations";

const ContactForm = ({ initialValues, onSubmit }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    if (initialValues.id) {
        dispatch(
        updateContactThunk({
          contactId: initialValues.id,
          contactData: {
            name: values.name,
            number: values.number,
            // Входять лише ті поля, які вимагаються API
          },
        })
      );
    } else {
      dispatch(addContactThunk(values));
    }
    options.resetForm();
    onSubmit();
  };
  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required!"),
    number: Yup.string()
      .matches(/^[0-9]+(-[0-9]+)*$/, "Invalid format")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={style.form}>
        <Field
          className={style.input}
          type="text"
          name="name"
          placeholder="Name"
        />
        <ErrorMessage className={style.error} name="name" component="span" />
        <Field
          className={style.input}
          type="text"
          name="number"
          placeholder="Number"
        />
        <ErrorMessage className={style.error} name="number" component="span" />
        <button className={style.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
