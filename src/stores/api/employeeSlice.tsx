import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CONFIG} from 'configs/index';
import {ITableColumnValue} from 'modules/home/index.d';
interface INewEmployeeValues {
  firstName: string;
  lastName: string;
  age: number;
}
interface IUpdateEmployeeValues {
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  id: number;
}

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
    createEmployee: builder.mutation<ITableColumnValue, INewEmployeeValues>({
      query: body => ({url: '/users/add', method: 'POST', body}),
    }),
    deleteEmployee: builder.mutation<ITableColumnValue, number>({
      query: id => ({url: `/users/${id}`, method: 'DELETE'}),
    }),
    updateEmployee: builder.mutation<ITableColumnValue, IUpdateEmployeeValues>({
      query: body => ({
        url: `/users/${body.id}`,
        method: 'PUT',
        body: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          university: body.university,
        },
      }),
    }),
  }),
});
export const {
  useGetEmployeeQuery,
  useGetEmployeeDetailQuery,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useLazyGetEmployeeQuery,
} = apiSlice;
