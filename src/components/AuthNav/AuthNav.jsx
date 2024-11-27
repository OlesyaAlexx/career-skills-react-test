import { NavLink } from "react-router-dom";
import style from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <nav className={style.nav}>
      <ul className={style.list}>
        <li>
          <NavLink className={style.link} to="/register">
            Registration
          </NavLink>
        </li>
        <li>
          <NavLink className={style.link} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AuthNav;
