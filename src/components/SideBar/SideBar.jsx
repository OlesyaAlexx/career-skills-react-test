/* import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import style from "./AppBar.module.css";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={style.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
 */

/* import { useState } from "react"; */
import style from "./SideBar.module.css";
import sprite from "../../images/symbol-defs.svg";
import { useState } from "react";

const SideBar = ({ filters, onFilterChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});
  /*  const [locationInput, setLocationInput] = useState(filters.location);
  const [currentFilters, setCurrentFilters] = useState(filters || {}); */
  /* const [appliedFilters, setAppliedFilters] = useState({}); */

  // Локальне оновлення фільтрів
  const handleFilterChange = (filterKey, value) => {
    setLocalFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };
  /* const handleFilterChange = (filterKey, value) => {
    setCurrentFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  }; */
  // Обробка натискання Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onFilterChange(localFilters);
      onSearch(); // Запуск пошуку
    }
  };

  const handleSearchClick = () => {
    onFilterChange(localFilters); // Оновлення фільтрів у батьківському компоненті
    onSearch(); // Запуск пошуку
  };

  /* const handleSearch = (e) => {
    e.preventDefault();
    onSearch(); // Викликаємо пошук
  }; */

  /*  const handleLocationBlur = () => {
    const trimmedInput = locationInput.trim();
    handleFilterChange("location", trimmedInput || null); // Передаємо null, якщо поле порожнє
  }; */

  const filterIcons = [
    { value: "AC", label: "AC", iconId: "icon-wind" },
    { value: "transmission", label: "Automatic", iconId: "icon-diagram" },
    { value: "Kitchen", label: "Kitchen", iconId: "icon-cup-hot" },
    { value: "TV", label: "TV", iconId: "icon-tv" },
    { value: "Bathroom", label: "Bathroom", iconId: "icon-ph_shower" },
  ];

  const vehicleOptions = [
    { value: "panelTruck", label: "Van", iconId: "icon-bi_grid-1x2" },
    {
      value: "fullyIntegrated",
      label: "Fully Integrated",
      iconId: "icon-bi_grid",
    },
    { value: "alcove", label: "Alcove", iconId: "icon-bi_grid-3x3-gap" },
  ];

  return (
    <div className={style.sidebar}>
      {/* Location Input */}
      <div className={style.locationContainer}>
        <h3>Location</h3>
        <div className={style.wrapperLocation}>
          <svg className={style.locationIcon} width="14" height="14">
            <use href={`${sprite}#icon-LocationCity`} />
          </svg>
          <input
            type="text"
            value={localFilters.location || ""}
            onChange={(e) =>
              handleFilterChange("location", e.target.value.trim())
            }
            onKeyDown={handleKeyPress}
            placeholder="Enter the city"
            className={style.locationInput}
          />
        </div>
      </div>

      {/* Filters */}
      <h3>Filters</h3>
      <div className={style.filter}>
        <h4>Vehicle equipment</h4>
        <div className={style.iconFilter}>
          {filterIcons.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`${style.iconButton} ${
                localFilters[filter.value] ? style.selected : ""
              }`}
              onClick={() =>
                handleFilterChange(filter.value, !localFilters[filter.value])
              }
            >
              <svg className={style.iconPhoto}>
                <use href={`${sprite}#${filter.iconId}`} />
              </svg>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Type */}
      <div className={style.vehicleTypeContainer}>
        <h4>Vehicle type</h4>
        <div className={style.vehicleTypeOptions}>
          {vehicleOptions.map((option) => (
            <button
              key={option.value}
              className={`${style.vehicleTypeCard} ${
                localFilters.vehicleType === option.value ? style.selected : ""
              }`}
              onClick={() => handleFilterChange("vehicleType", option.value)}
              aria-label={`Select ${option.label}`}
            >
              <svg width="24" height="24">
                <use href={`${sprite}#${option.iconId}`} />
              </svg>
              <div>{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearchClick}
        className={style.searchButton}
        disabled={!Object.values(localFilters).some(Boolean)} // Кнопка неактивна, якщо фільтри порожні
      >
        Search
      </button>
    </div>
  );
};

export default SideBar;
