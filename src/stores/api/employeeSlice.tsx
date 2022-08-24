import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CONFIG} from 'configs/index';
import {ITableColumnValue} from 'modules/home/index.d';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: CONFIG.API.EMPLOYEE}),
  endpoints: builder => ({
    getEmployee: builder.query<any, void>({
      query: () => '/users',
    }),
    getEmployeeDetail: builder.query<ITableColumnValue, number>({
      query: id => `/users/${id}`,
    }),
  }),
});
export const {useGetEmployeeQuery, useGetEmployeeDetailQuery} = apiSlice;
