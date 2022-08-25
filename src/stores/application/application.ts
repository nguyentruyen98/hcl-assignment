import {
  AnyAction,
  AsyncThunk,
  configureStore,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// import {apiSlice} from 'stores/api/employeeSlice';

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
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}
function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}
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
      .addMatcher(isPendingAction, state => {
        state.loading = true;
      })
      .addMatcher(isFulfilledAction, (state, action: AnyAction) => {
        state.loading = false;

        if (action?.meta?.arg?.type === 'query') {
          state.message = '';
        } else if (action?.meta?.arg?.type === 'mutation') {
          state.message = 'Success';
          state.alertType = 'SUCCESS';
        }
      })
      .addMatcher(isRejectedAction, (state, action: AnyAction) => {
        state.loading = false;
        if (action?.meta?.arg?.type === 'query') {
          state.message = '';
        } else if (action?.meta?.arg?.type === 'mutation') {
          state.message = 'Success';
          state.alertType = 'SUCCESS';
        }
      });
  },
});

export const store = configureStore({
  reducer: {
    application: applicationSlice.reducer,
  },
});

export const {setLoading} = applicationSlice.actions;
