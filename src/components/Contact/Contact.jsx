import style from "./Contact.module.css";
import { FaPhone } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteContactThunk } from "../../redux/contacts/operations";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ContactForm from "../ContactForm/ContactForm";

const Contact = ({ contact, onEditClick }) => {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContactThunk(contact.id));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = () => {
    onEditClick(contact);
    setIsEditModalOpen(false);
  };

  return (
    <div className={style.containerContact}>
      <div className={style.info}>
        <p>
          <RiContactsFill className={style.icon} />
          {contact.name}
        </p>
        <p>
          <FaPhone className={style.icon} />
          {contact.number}
        </p>
      </div>
      <div className={style.buttonCase}>
        <button
          className={style.button}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
        <button
          className={style.buttonEdit}
          onClick={() => setIsEditModalOpen(true)}
        >
          <FaEdit className={style.icon} />
          Edit
        </button>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ContactForm
          initialValues={contact}
          onSubmit={handleEdit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Contact;
