import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { loginThunk } from "../../redux/auth/operations";
import { Navigate, Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import style from "./LoginForm.module.css";
import { Form, Formik, Field, ErrorMessage } from "formik";

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, options) => {
    dispatch(loginThunk(values));
    // Скидаємо форму після відправки
    options.resetForm();
    navigate("/contacts");
  };

  // Схема валідації для форми за допомогою Yup
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, "To Short!")
      .max(50, "To Long!")
      .required("Required!"),
    password: Yup.string()
      .matches(/^[0-9]+(-[0-9]+)*$/, "Invalid format")
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
      validationSchema={LoginSchema}
    >
      <Form autoComplete="off" className={style.form}>
        <label htmlFor="email">
          Email
          <Field name="email" type="email" id="email" autoComplete="email" />
        </label>
        <ErrorMessage className={style.error} name="name" component="span" />
        <label htmlFor="password">
          Password
          <Field
            name="password"
            type="password"
            id="password"
            autoComplete="password"
          />
        </label>
        <ErrorMessage className={style.error} name="number" component="span" />
        <button className={style.btn} type="submit">
          Sing in
        </button>
        <p>
          You do not have account? <Link to="/register">Sign up!</Link>
        </p>
      </Form>
    </Formik>
  );
};
export default LoginForm;
