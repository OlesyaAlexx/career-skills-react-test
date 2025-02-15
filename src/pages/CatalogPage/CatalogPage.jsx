/* import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchContactsThunk } from "../../redux/contacts/operations";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import Loader from "../../components/Loader/Loader";
import style from "./ContactsPage.module.css";
import {
  selectFilteredContacts,
  selectIsLoading,
  selectIsError,
} from "../../redux/contacts/selectors";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setIsEditMode(true);
  };

  const handleFormSubmit = () => {
    setSelectedContact(null);
    setIsEditMode(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div className={style.case}>
      <ContactForm
        initialValues={selectedContact || { name: "", number: "" }}
        onSubmit={handleFormSubmit}
        isEditMode={isEditMode}
      />
      <SearchBox />
      <ContactList contacts={filteredContacts} onEditClick={handleEditClick} />
    </div>
  );
};

export default ContactsPage;
 */

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import SideBar from "../../components/SideBar/SideBar.jsx";
import CampersList from "../../components/CampersList/CampersList.jsx";
import style from "./CatalogPage.module.css";
import { fetchCampers } from "../../redux/campers/operations.js";
import Loader from "../../components/Loader/Loader.jsx";
import LoadMoreBtn from "../../components/Layout/LoadMoreBtn.jsx";
/* import { selectFilteredCampers } from "../../redux/campers/selectors.js"; */

const CatalogPage = () => {
  const [filters, setFilters] = useState({
    location: "",
    form: "",
    AC: null,
    transmission: "",
    Kitchen: null,
    TV: null,
    Bathroom: null,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [campersPerPage] = useState(5);
  /* const [campersToDisplay, setCampersToDisplay] = useState([]); */

  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.data) || [];

  /*  const campers = useSelector(selectFilteredCampers); */
  const error = useSelector((state) => state.campers.error);
  /* const totalPages = useSelector((state) => state.campers.totalPages) || 1; */

  /*  const itemsPerPage = 5; */ // кількість кемперів на сторінці

  // Обчислення кемперів для відображення
  /* const campersToDisplay = campers.slice(0, page * itemsPerPage); */

  /* const debounceFilter = useRef(null); */

  // Функція для зміни фільтрів
  /*  const handleFilterChange = (filterKey, value) => {
    clearTimeout(debounceFilter.current);
    debounceFilter.current = setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: value || "",
      }));
      setPage(1); // Скидаємо сторінку при зміні фільтрів
    }, 500);
  }; */

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  // Запит до бекенду для отримання кемперів
  const handleSearch = async () => {
    setLoading(true);
    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {}
    );

    try {
      dispatch(fetchCampers({ ...activeFilters }));
    } catch (error) {
      console.error("Error fetching campers:", error);
    } finally {
      setLoading(false);
    }
  };
  const memoizedFilters = useMemo(() => filters, [filters]);
  // Викликаємо handleSearch при зміні сторінки чи фільтрів
  useEffect(() => {
    console.log("Calling handleSearch");
    handleSearch();
  }, [memoizedFilters]);

  // Логування для перевірки даних
  console.log("Campers:", campers);

  const indexOfLastCamper = page * campersPerPage;
  const indexOfFirstCamper = indexOfLastCamper - campersPerPage;
  const currentCampers = campers.slice(indexOfFirstCamper, indexOfLastCamper);

  // Завантаження додаткової сторінки
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className={style.catalogContainer}>
      {/* Сайдбар */}
      <aside className={style.sidebar}>
        <SideBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      </aside>

      {/* Основний контент */}
      <main className={style.mainContent}>
        {error ? (
          <div>Error loading campers: {error.message || error}</div>
        ) : loading && page === 1 ? (
          <Loader />
        ) : campers.length === 0 ? (
          <p>No campers available.</p>
        ) : (
          <CampersList campers={currentCampers} />
        )}

        {/* Кнопка "Load more" */}
        {campers.length > 0 && campers.length > indexOfLastCamper && (
          <LoadMoreBtn
            className={style.loadMoreButton}
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </LoadMoreBtn>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;
