import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertsSlice } from "./AlertsSlice";
import { UserSlice } from "./UserSlice";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: UserSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
