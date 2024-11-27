import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { registerThunk } from "../../redux/auth/operations";
import { Navigate, Link } from "react-router-dom";
import * as Yup from "yup";
import style from "./RegistrationForm.module.css";
import { Form, Formik, Field, ErrorMessage } from "formik";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(registerThunk(values));
    // Скидаємо форму після відправки
    resetForm();
  };

  // Схема валідації для форми за допомогою Yup
  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "To Short!")
      .max(50, "To Long!")
      .required("Required!"),
    email: Yup.string()
      .min(3, "To Short!")
      .max(50, "To Long!")
      .required("Required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .max(50, "To Long!")
      .required("Required!"),
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    // Налаштування Formik з початковими значеннями, обробником відправки та схемою валідації
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      <Form autoComplete="off" className={style.form}>
        <label htmlFor="name">
          Name
          <Field name="name" type="text" id="name" autoComplete="name" />
        </label>
        <ErrorMessage name="name" component="div" className={style.error} />
        <label htmlFor="email">
          Email
          <Field name="email" type="email" id="email" autoComplete="email" />
        </label>
        <ErrorMessage className={style.error} name="email" component="span" />
        <label htmlFor="password">
          Password
          <Field
            name="password"
            type="password"
            id="password"
            autoComplete="password"
          />
        </label>
        <ErrorMessage
          className={style.error}
          name="password"
          component="span"
        />
        <button className={style.btn} type="submit">
          Sing up
        </button>
        <p>
          You already have account? <Link to="/login">Sign in!</Link>
        </p>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
