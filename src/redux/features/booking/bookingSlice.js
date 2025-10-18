// features/booking/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  salonId: null,
  serviceId: null,
  technicianId: null,
  date: null,
  time: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // Set all booking details at once
    setBooking: (state, action) => {
      return { ...state, ...action.payload };
    },

    // Update one or more fields
    updateBooking: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },

    // Get booking (optional, for selector use)
    getBooking: (state) => state,

    // Remove booking (reset to initial)
    removeBooking: () => initialState,
  },
});

export const { setBooking, updateBooking, getBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
