import { useDispatch, useSelector } from "react-redux";
import style from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { logoutThunk } from "../../redux/auth/operations";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={style.case}>
      <p className={style.userText}>Hello, {user.name}!</p>
      <button
        className={style.outBtn}
        type="button"
        onClick={() => dispatch(logoutThunk())}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
