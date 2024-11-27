import { clearToken, goitAPI, setToken } from "../../config/goitAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitAPI.post("users/signup", credentials);
      setToken(data.token);
      localStorage.setItem("authToken", data.token); // Зберігаємо токен
      return data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      //Запит до сервера:
      const { data } = await goitAPI.post("users/login", credentials);
      setToken(data.token);
      localStorage.setItem("authToken", data.token); // Зберігаємо токен
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await goitAPI.post("/users/logout");
      clearToken(); // Очищення заголовка
      localStorage.removeItem("authToken"); // Видалення токена з localStorage
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const savedToken = localStorage.getItem("authToken");
    if (!savedToken) {
      return thunkAPI.rejectWithValue("Token is missing");
    }

    try {
      const { data } = await goitAPI.get("/users/current");
      return data;
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
