import LoginForm from "../../components/LoginForm/LoginForm";
import style from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={style.case}>
      <h1 className={style.title}>Welcome!</h1>
      <p className={style.text}>
        Enter your email and password for authorization
      </p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
