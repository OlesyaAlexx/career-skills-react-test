/* import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectIsError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, (state) => state.filters.name],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    if (!filter) {
      return contacts; // Повертаємо всі контакти, якщо фільтр порожній
    }

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(filter)
    );
  }
);
 */

/* import { createSelector } from "reselect";
export const selectCampers = (state) => state.campers.data.items;
export const selectCamper = (state) => state.campers.camper;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error; */
/* export const selectLocation = (state) => state.campers.location; */

// Створюємо мемоізований селектор
/* export const selectFilteredCampers = createSelector(
  [selectCampers, (state) => state.filters],
  (campersData, filters) => {
    // Перевірка, чи є campersData масивом
    if (
      !campersData ||
      (Array.isArray(campersData) && campersData.length === 0)
    ) {
      console.error(
        "Expected campers to be an object with an items array, but got:",
        campersData
      );
      return [];
    }

    // Якщо campersData - це масив, то безпосередньо працюємо з ним
    const campers = Array.isArray(campersData)
      ? campersData
      : campersData.items || [];

    return campers.filter((camper) => {
      return (
        (!filters.location || camper.location.includes(filters.location)) &&
        (!filters.vehicleType || camper.vehicleType === filters.vehicleType) &&
        (!filters.AC || camper.AC === filters.AC) &&
        (!filters.Kitchen || camper.Kitchen === filters.Kitchen) &&
        (!filters.TV || camper.TV === filters.TV) &&
        (!filters.Bathroom || camper.Bathroom === filters.Bathroom)
      );
    });
  }
); */

// Селектори для отримання даних
/* export const selectCampers = (state) => state.campers?.data?.items || [];
export const selectCamper = (state) => state.campers.camper;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;

export const selectFilters = (state) => {
  console.log("Filters selector called:", state.filters);
  return state.filters;
}; */

// Створюємо мемоізований селектор
/* export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters], // Використовуйте окремий селектор для filters
  (campers, filters) => {
    // Фільтрація
    return campers.filter((camper) => {
      return (
        (!filters.location || camper.location?.includes(filters.location)) &&
        (!filters.vehicleType || camper.vehicleType === filters.vehicleType) &&
        (filters.AC === undefined || camper.AC === filters.AC) &&
        (filters.Kitchen === undefined || camper.Kitchen === filters.Kitchen) &&
        (filters.TV === undefined || camper.TV === filters.TV) &&
        (filters.Bathroom === undefined || camper.Bathroom === filters.Bathroom)
      );
    });
  }
);
 */
import { createSelector } from "reselect";

// Базові селектори
export const selectCampers = (state) => state.campers.data;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
export const selectFilters = (state) => state.campers.filters; //++++

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    // Окремо для тестування, без фільтрів
    if (!filters || Object.keys(filters).length === 0) {
      return campers; // Повертаємо всі кемпери, якщо фільтри не встановлені
    }

    // Далі йде фільтрація
    /*  let filteredCampers = campers;

    if (filters.location && filters.location.trim() !== "") {
      const normalizedLocation = filters.location.toLowerCase();
      filteredCampers = filteredCampers.filter((camper) =>
        camper.location.toLowerCase().includes(normalizedLocation)
      );
    } */
    return campers.filter((camper) => {
      const { location, form, AC, transmission, kitchen, TV, bathroom } =
        filters;
      // Фільтрація по локації
      if (location?.trim()) {
        const normalizedLocation = location.toLowerCase();
        if (!camper.location?.toLowerCase().includes(normalizedLocation)) {
          return false;
        }
      }

      // Фільтрація по формі
      if (form?.trim() && camper.form !== form) {
        return false;
      }

      // Фільтрація по трансмісії
      if (transmission?.trim() && camper.transmission !== transmission) {
        return false;
      }

      // Фільтрація по характеристиках (булеві значення)
      if (AC && !camper.AC) return false;
      if (kitchen && !camper.kitchen) return false;
      if (TV && !camper.TV) return false;
      if (bathroom && !camper.bathroom) return false;

      return true; // Якщо кемпер проходить усі фільтри
    });
  }
);
/*  if (filters.form) {
      filteredCampers = filteredCampers.filter(
        (camper) => camper.form === filters.form
      );
    }
    if (filters.AC) {
      filteredCampers = filteredCampers.filter(
        (camper) => camper.AC === filters.AC
      );
    }
    if (filters.transmission) {
      filteredCampers = filteredCampers.filter(
        (camper) => camper.transmission === filters.transmission
      );
    }
    if (filters.kitchen) {
      filteredCampers = filteredCampers.filter(
        (camper) => camper.kitchen === filters.kitchen
      );
    }
    if (filters.TV) {
      filteredCampers = filteredCampers.filter(
        (camper) => camper.TV === filters.TV
      );
    }
    if (filters.bathroom) {
      filteredCampers = filteredCampers.filter(
        (camper) => camper.bathroom === filters.bathroom
      );
    } */
// І так далі для інших фільтрів

/*  return filteredCampers;
  }
); */
// Створюємо мемоізований селектор для фільтрації
/* export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    if (Object.keys(filters).length === 0) {
      return campers; // Якщо фільтри порожні, повертаємо весь список
    }
    return campers.filter((camper) =>
      Object.entries(filters).every(([key, value]) =>
        matchesFilter(camper, key, value)
      )
    );
  }
); */
