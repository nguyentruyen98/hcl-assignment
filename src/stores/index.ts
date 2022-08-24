import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import {apiSlice} from 'stores/api/employeeSlice';
import {applicationSlice} from 'stores/application/application';
export const store = configureStore({
  reducer: {
    application: applicationSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RTCIceConnectionState,
  unknown,
  Action<string>
>;

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
export const useDispatch = () => useDispatchRedux<AppDispatch>();
