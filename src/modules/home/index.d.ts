export interface ITableColumnValue {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  address: {address: string; city: string};
  company: {address: {address: string; city: string}};
}
