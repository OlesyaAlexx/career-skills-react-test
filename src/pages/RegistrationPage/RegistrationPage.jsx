import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import style from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={style.case}>
      <h1 className={style.title}>Hello!</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
