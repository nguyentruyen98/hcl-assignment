export interface AnyObject {
  [key: string]: any;
}
export type MethodsType = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type ApiMethodsType = Record<
  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  MethodsType
>;
