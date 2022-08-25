import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {ITableColumnValue} from 'modules/home/index.d';
import {apiSlice} from 'stores/api/employeeSlice';

interface IEmployeeState {
  employees: ITableColumnValue[];
}

const initialState: IEmployeeState = {
  employees: [],
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    deleteEmployee: (state, action: PayloadAction<number>) => {
      const employeeList = [...state.employees];
      employeeList.map((employee, index) => {
        if (employee.id === action.payload) {
          employeeList.splice(index, 1);
          return;
        }
      });
      return {...state, employees: employeeList};
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.getEmployee.matchFulfilled,
      (state, action) => {
        return {...state, employees: action.payload.users};
      },
    );
  },
});
export const {deleteEmployee} = employeeSlice.actions;
