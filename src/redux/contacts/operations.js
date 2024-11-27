import { createAsyncThunk } from "@reduxjs/toolkit";
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
