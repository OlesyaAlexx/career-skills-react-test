/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = slice.actions;
export const filterReducer = slice.reducer;
export default filterReducer;
 */

/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "",
  AC: true,
  transmission: "", // Пропуститься, бо `null`
  kitchen: "", // Пропуститься, бо порожній рядок
  TV: false,
  bathroom: true,
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Оновлює значення одного фільтра
    setFilter: (state, action) => {
      const { key, value } = action.payload; // Очікуємо об'єкт { key: "назва фільтра", value: "значення" }
      if (key in state) {
        state[key] = value;
      } else {
        console.warn(`Фільтр "${key}" не знайдено в state.filters`);
        // Можна повернути помилку або інше значення для кращого оброблення
      }
    },

    // Скидає всі фільтри до початкового стану
    resetFilters: () => initialState,
  },
});

// Експортуємо дії
export const { setFilter, resetFilters } = slice.actions;

// Експортуємо ред'юсер
export const filterReducer = slice.reducer; */

// Селектор для доступу до фільтрів
/* export const selectCampersFilter = (state) => state.filters; */
