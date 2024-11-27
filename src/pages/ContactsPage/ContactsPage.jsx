import { useDispatch, useSelector } from "react-redux";
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
