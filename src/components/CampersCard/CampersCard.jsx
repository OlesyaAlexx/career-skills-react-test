/* import style from "./Contact.module.css";
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

export default Contact; */

import { useState, useEffect } from "react";
import sprite from "../../images/symbol-defs.svg";
import style from "./CampersCard.module.css";

const CampersCard = ({ camper }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Створюємо масив з усіх властивостей, які можна використовувати як фільтри
  const featureKeys = [
    "AC",
    "bathroom",
    "kitchen",
    "TV",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
    "transmission",
  ];
  const features = featureKeys.filter((key) => camper[key] === true); // Фільтруємо по значенню true

  // Створюємо об'єкт для мапінгу фільтрів на іконки
  const featureIcons = {
    AC: <use href={`${sprite}#icon-wind`} />,
    bathroom: <use href={`${sprite}#icon-ph_shower`} />,
    kitchen: <use href={`${sprite}#icon-cup-hot`} />,
    TV: <use href={`${sprite}#icon-tv`} />,
    radio: <use href={`${sprite}#icon-ui-radios`} />,
    refrigerator: <use href={`${sprite}#icon-solar_fridge-outline`} />,
    microwave: <use href={`${sprite}#icon-lucide_microwave`} />,
    gas: <use href={`${sprite}#icon-hugeicons_gas-stove1`} />,
    water: <use href={`${sprite}#icon-ion_water-outline`} />,
    transmission: <use href={`${sprite}#icon-diagram`} />,
  };
  const noFillIcons = ["gas", "water", "microwave"]; // Іконки без fill

  const reviewsCount = camper.reviews?.length ?? 0;
  const rating = camper.rating ?? 0;
  const mainImage =
    camper.gallery?.[0]?.thumb || "/images/placeholder-camper.jpg";

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.includes(camper.id));
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setIsFavorite(false);
    }
  }, [camper.id]);

  const toggleFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favorites.includes(camper.id)) {
        const updatedFavorites = favorites.filter((id) => id !== camper.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        favorites.push(camper.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  const handleShowMore = () => {
    const detailPageUrl = `/catalog/${camper.id}`;
    window.open(detailPageUrl, "_blank");
  };

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img
          className={style.image}
          src={mainImage}
          alt={camper.name ?? "Camper"}
        />
      </div>
      <div className={style.info}>
        <div className={style.topTitle}>
          <h2 className={style.title}>{camper.name ?? "Unnamed Camper"}</h2>
          <div className={style.priceContainer}>
            <p className={style.price}>{`€${camper.price?.toFixed(2)}`}</p>
            <button
              className={`${style.favoriteButton} ${
                isFavorite ? style.active : ""
              }`}
              onClick={toggleFavorite}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg className={style.icon} width="25" height="24">
                <use href={`${sprite}#icon-heat`} />
              </svg>
            </button>
          </div>
        </div>
        <div className={style.ratingLocation}>
          <div className={style.rating}>
            <svg className={style.iconStar} width="16" height="16">
              <use href={`${sprite}#icon-star`} />
            </svg>
            {/*  <span className={style.reviews}>{rating || "No rating"}</span> */}
            <span className={style.reviews}>
              {rating || "No rating"} ({reviewsCount}
              {reviewsCount === 1 ? "Review" : "Reviews"})
            </span>
          </div>
          <div className={style.locContainer}>
            <svg className={style.iconLocation} width="16" height="16">
              <use href={`${sprite}#icon-LocationCity`} />
            </svg>
            <p className={style.location}>
              {camper.location ?? "Unknown Location"}
            </p>
          </div>
        </div>
        <p className={style.details}>
          {camper.description ??
            "Details about this camper are currently unavailable."}
        </p>
        {features.length > 0 && (
          <ul className={style.features}>
            {features.map((feature, index) => (
              <li key={index} className={style.featureItem}>
                <svg
                  className={`${style.iconFeatures} ${
                    noFillIcons.includes(feature) ? style.iconNoFill : ""
                  }`}
                  width="20"
                  height="20"
                >
                  {featureIcons[feature]}
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
        <button className={style.showMoreButton} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CampersCard;
