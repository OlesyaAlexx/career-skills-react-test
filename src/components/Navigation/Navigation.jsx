/* import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import style from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={style.box}>
      <NavLink className={style.navigation} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={style.navigation} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation; */

import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

const Navigation = () => {
  return (
    <nav className={styles.box}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoLink}>
          TravelTrucks
        </NavLink>
      </div>
      <ul className={styles.nav}>
        <li>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to="/catalog">
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
