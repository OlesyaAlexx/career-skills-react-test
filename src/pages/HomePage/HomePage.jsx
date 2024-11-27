/* import style from "./HomePage.module.css";
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
 */
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={style.box}>
      <div className={style.textContainer}>
        <h1 className={style.title}>Campers of your dreams</h1>
        <h2 className={style.text}>
          You can find everything you want in our catalog
        </h2>
        <Link to="/catalog" className={style.linkCatalog}>
          View Now
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
