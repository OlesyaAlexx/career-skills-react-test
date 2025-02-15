/* import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
  updateContactThunk,
} from "./operations.js";
import { logoutThunk } from "../auth/operations.js";

const initialState = {
  items: [],
  error: null,
  loading: false,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.pending,
          addContactThunk.pending,
          deleteContactThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.rejected,
          addContactThunk.rejected,
          deleteContactThunk.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.fulfilled,
          addContactThunk.fulfilled,
          deleteContactThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const contactReducer = slice.reducer;

export default contactReducer;
 */

import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./operations";

const initialState = {
  data: [], // Список кемперів
  camper: null, // Деталі конкретного кемпера
  isLoading: false,
  error: null,
  total: 0,

  filters: {
    location: "",
    form: "",
    AC: false,
    transmission: "",
    kitchen: false,
    TV: false,
    bathroom: false,
  }, // Фільтри для пошуку
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    // Оновлює значення одного фільтра
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      if (key in state.filters) {
        state.filters[key] = value;
      } else {
        console.warn(`Фільтр "${key}" не знайдено в state.filters`);
      }
    },
    // Скидає всі фільтри до початкового стану
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
    // Скидає дані кемперів
    resetCampersData: (state) => {
      state.data = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = [];
      })
      /*  .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.items) {
          state.data = action.payload.items;
          /*  state.data = [...state.data, ...action.payload]; */ //***
      /*  state.total = action.payload.total;
        }
      }) */

      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        // Просто перезаписуємо дані
        state.data = action.payload.items || [];

        // Встановлюємо загальну кількість елементів, якщо вона є у відповіді
        state.total = action.payload.total || state.data.length;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.camper = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.camper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Експортуємо дії
export const { setFilter, resetFilters, resetCampersData } =
  campersSlice.actions;

// Експортуємо ред'юсер
export const campersReducer = campersSlice.reducer;

export default campersReducer;
