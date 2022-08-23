import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import {applicationSlice} from 'stores/application/application';
import {employeeSlice} from 'stores/employee';
export const store = configureStore({
  reducer: {
    application: applicationSlice.reducer,
    employee: employeeSlice.reducer,
  },
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
