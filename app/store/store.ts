import {configureStore} from '@reduxjs/toolkit';

// Slices
import wishlist from './wishlistSlice';

export const store = configureStore({
  reducer: {
    wishlist: wishlist,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
