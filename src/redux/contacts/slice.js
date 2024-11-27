import { createSlice, isAnyOf } from "@reduxjs/toolkit";

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
