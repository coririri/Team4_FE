import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './slices/modalSlice';
import { menuTagReducer } from './slices/menuTagSlice';
import { promptMenuReducer } from './slices/promptMenu';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    menuTag: menuTagReducer,
    promptMenu: promptMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
