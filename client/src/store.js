import { configureStore } from "@reduxjs/toolkit";
import userSlide from "./features/userSlide";
import api from "./services/api";

// persist
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//
const reducer = combineReducers({
  user: userSlide,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [api.reducerPath],
};

//persist store
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, api.middleware],
});

export default store