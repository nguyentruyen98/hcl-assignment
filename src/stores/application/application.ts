import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IApplicationState {
  loading: boolean;
}
const initialState: IApplicationState = {
  loading: false,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    application: applicationSlice.reducer,
  },
});

export const {setLoading} = applicationSlice.actions;
