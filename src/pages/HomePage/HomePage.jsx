import style from "./HomePage.module.css";
import internetMin from "../../images/internetMin.jpeg";

const HomePage = () => {
  return (
    <div className={style.box}>
      <div className={style.textContainer}>
        <h1 className={style.title}>Welcome to Your Contact Book!</h1>
        <p className={style.text}>
          Save and manage your contacts easily and conveniently.
        </p>
      </div>
      <div className={style.imageContainer}>
        <img
          src={internetMin}
          alt="Internet Contact"
          className={style.responsiveImage}
        />
      </div>
    </div>
  );
};
export default HomePage;
