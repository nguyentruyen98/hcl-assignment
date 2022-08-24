import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiSlice} from 'stores/api/employeeSlice';

export interface IApplicationState {
  loading: boolean;
  message: string;
  alertType: 'SUCCESS' | 'FAIL';
}
const initialState: IApplicationState = {
  loading: false,
  message: '',
  alertType: 'SUCCESS',
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(apiSlice.endpoints.deleteEmployee.matchPending, state => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.deleteEmployee.matchFulfilled, state => {
        state.loading = false;
        state.alertType = 'SUCCESS';
        state.message = 'Success';
      })
      .addMatcher(apiSlice.endpoints.deleteEmployee.matchRejected, state => {
        state.loading = false;
        state.alertType = 'FAIL';
        state.message = 'Fail';
      })
      .addMatcher(apiSlice.endpoints.createEmployee.matchPending, state => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.createEmployee.matchFulfilled, state => {
        state.loading = false;
        state.alertType = 'SUCCESS';
        state.message = 'Success';
      })
      .addMatcher(apiSlice.endpoints.createEmployee.matchRejected, state => {
        state.loading = false;
        state.alertType = 'FAIL';
        state.message = 'Fail';
      })
      .addMatcher(apiSlice.endpoints.updateEmployee.matchPending, state => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.updateEmployee.matchFulfilled, state => {
        state.loading = false;
        state.alertType = 'SUCCESS';
        state.message = 'Success';
      })
      .addMatcher(apiSlice.endpoints.updateEmployee.matchRejected, state => {
        state.loading = false;
        state.alertType = 'FAIL';
        state.message = 'Fail';
      });
  },
});

export const store = configureStore({
  reducer: {
    application: applicationSlice.reducer,
  },
});

export const {setLoading} = applicationSlice.actions;
