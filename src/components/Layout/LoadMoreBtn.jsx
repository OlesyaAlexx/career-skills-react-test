/* import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const Layout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
export default Layout; */
import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
