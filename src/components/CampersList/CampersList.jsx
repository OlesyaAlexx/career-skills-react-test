/* import Contact from "../Contact/Contact";
import style from "./ContactList.module.css";
import { useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectIsError,
  selectIsLoading,
} from "../../redux/contacts/selectors";
import Loader from "../Loader/Loader";

const ContactList = ({ contacts, onEditClick }) => {
  const filteredContacts = useSelector(selectFilteredContacts); //беруться всі контакти і значення фільтра та повертаються лише ті контакти, які відповідають умовам фільтра.
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  console.log("Filtered Contacts:", filteredContacts);

  //Якщо filteredContacts або його довжина дорівнює 0,
  // то відображається повідомлення про те, що контакти відсутні.
  if (!filteredContacts || filteredContacts.length === 0) {
    return <p className={style.text}>No contacts available</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{isError}</div>;
  }
  return (
    <ul className={style.list}>
      {contacts.map((contact) => (
        <li key={contact.id} className={style.item}>
          <Contact contact={contact} onEditClick={onEditClick} />
        </li>
      ))}
    </ul>
  );
};
export default ContactList; */

import { useSelector } from "react-redux";
import CampersCard from "../CampersCard/CampersCard.jsx";
import style from "./CampersList.module.css";
import Loader from "../Loader/Loader.jsx";
import {
  selectFilteredCampers,
  /* selectCampers, */
  selectIsLoading,
  selectError,
} from "../../redux/campers/selectors.js";

const CampersList = () => {
  const campers = useSelector(selectFilteredCampers);

  /* const campers = useSelector((state) => state.campers.data); */
  console.log("Campers passed to CampersList:", campers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return <Loader loading={isLoading} size={50} />;
  }

  if (error) {
    return <div>Something went wrong: {error.message || error}</div>;
  }

  // Перевіряємо, чи campers існує і чи це масив з елементами
  if (!Array.isArray(campers) || campers.length === 0) {
    return <p>No campers available or data format is incorrect.</p>;
  }
  console.log("Campers in CampersList:", campers);

  return (
    <div className={style.campersList}>
      {campers.map((camper) => (
        <CampersCard key={camper.id} camper={camper} />
      ))}
    </div>
  );
};

export default CampersList;
