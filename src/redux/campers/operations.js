/* import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitAPI } from "../../config/goitAPI";

export const fetchContactsThunk = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await goitAPI.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkAPI) => {
    try {
      const { data } = await goitAPI.post("/contacts", body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await goitAPI.delete(`/contacts/${id}`);
      return id; // Повертаємо ID для видалення з локального стану
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContactThunk = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactId, contactData }, thunkAPI) => {
    try {
      // Отримання токену з локального стану або куки
      const state = thunkAPI.getState();
      const token = state.auth.token; // або звідки ви отримуєте токен

      const { data } = await goitAPI.patch(
        `/contacts/${contactId}`,
        contactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error updating contact:", {
        message: error.message,
        response: error.response ? error.response.data : "No response data",
      });
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
 */

import { mockAPI } from "../../config/mockAPI.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

/* export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async () => {
    const response = await mockAPI.get("/"); // Запит до Mock API
    return response.data;
  }
); */

/* export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters, { rejectWithValue }) => {
    const { location, vehicleType, AC, kitchen, TV, bathroom } = filters;

    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (vehicleType) params.append("form", vehicleType);
    if (AC) params.append("AC", AC);
    if (kitchen) params.append("Kitchen", kitchen);
    if (TV) params.append("TV", TV);
    if (bathroom) params.append("Bathroom", bathroom);

    try {
      console.log(
        "Request URL:",
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${params.toString()}`
      );
      const response = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${params.toString()}`
      );

      // Перевірка статусу відповіді
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
); */

/* export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, { getState, rejectWithValue }) => {
    const filters = getState().filters; // Приклад отримання фільтрів зі стану
    const { location, vehicleType, AC, kitchen, TV, bathroom } = filters;

    const params = {};
    if (location) params.location = location;
    if (vehicleType) params.form = vehicleType;
    if (AC) params.AC = AC;
    if (kitchen) params.Kitchen = kitchen;
    if (TV) params.TV = TV;
    if (bathroom) params.Bathroom = bathroom;

    try {
      const response = await mockAPI.get("/", { params });
      console.log("Response from API:", response);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
); */

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, { getState, rejectWithValue }) => {
    const filters = getState().campers.filters; // Отримуємо фільтри зі стану
    const { location, form, AC, kitchen, TV, bathroom, transmission } = filters;

    // Формуємо параметри для запиту
    const params = {};
    if (location && location.trim()) params.location = location.trim();
    if (form) params.form = form.toString(); // Передаємо тип транспорту як "form"
    if (AC) params.AC = AC.toString(); // У рядковому форматі (для порівняння на сервері)
    if (kitchen) params.Kitchen = kitchen.toString();
    if (TV) params.TV = TV.toString();
    if (bathroom) params.Bathroom = bathroom.toString();
    if (transmission) params.transmission = transmission.toString();

    try {
      const response = await mockAPI.get("/", { params }); // Використовуємо правильний ендпоінт
      console.log("Response from API:", response);

      return response.data; // Повертаємо дані з API
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || error.message); // Обробка помилок
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    const response = await mockAPI.get(`/${id}`);
    return response.data;
  }
);
