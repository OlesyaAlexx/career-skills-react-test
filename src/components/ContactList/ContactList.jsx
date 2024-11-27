import Contact from "../Contact/Contact";
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
export default ContactList;
