import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {     
    user: userSlice,      
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
