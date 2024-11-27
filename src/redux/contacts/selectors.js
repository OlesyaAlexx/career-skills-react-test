import { createSelector } from "@reduxjs/toolkit";

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
