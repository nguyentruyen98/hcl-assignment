import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants/index';
import {Api} from 'hooks/useApi';
import {ITableColumnValue} from 'modules/home/index.d';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'stores';

export interface IEmployeeState {
  employee: ITableColumnValue[];
}
const initialState: IEmployeeState = {
  employee: [],
};

export const getEmployeeList = createAsyncThunk(
  'employee/fetchEmployee',
  async () => {
    const res = await Api({
      url: `${CONFIG.API.EMPLOYEE}/users`,
      method: API_METHODS.GET,
    });
    return res.users;
  },
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getEmployeeList.pending, state => {
        console.log(state);
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
      .addCase(getEmployeeList.rejected, state => {
        console.log(state);
      });
  },
});

export const useEmployeeSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useEmployeeDispatch = () => useDispatch<AppDispatch>();
