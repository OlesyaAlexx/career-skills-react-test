import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div>Sorry... Page is not found</div>
      <nav>
        <NavLink to="/">Go to Home</NavLink>
      </nav>
    </div>
  );
};

export default NotFound;
