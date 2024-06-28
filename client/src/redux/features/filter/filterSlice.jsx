import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredEvents: [],
};

// const FilterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     FILTER_EVENTS(state, action) {
//       const { events, search } = action.payload;
//       const tempEvents = events.filter((event) =>
//         event.title.toLowerCase().includes(search.toLowerCase())
//       );
//       state.filteredEvents = tempEvents;
//     },
//   },
// });
const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_EVENTS(state, action) {
      const { events, search, startDate, endDate } = action.payload;

      const tempEvents = events.filter((event) => {
        const matchesTitle = event.title
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesStartDate = startDate
          ? new Date(event.startDate) >= new Date(startDate)
          : true;

        const matchesEndDate = endDate
          ? new Date(event.endDate) <= new Date(endDate)
          : true;

        return matchesTitle && matchesStartDate && matchesEndDate;
      });

      state.filteredEvents = tempEvents;
    },
  },
});

export const { FILTER_EVENTS } = FilterSlice.actions;
export const selectFilteredEvents = (state) => state.filter.filteredEvents;

export default FilterSlice.reducer;
