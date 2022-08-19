export interface AnyObject {
  [key: string]: any;
}
export type MethodsType = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type ApiMethodsType = Record<
  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  MethodsType
>;

// export type AlertType = 'success' | 'fail';
export type AlertType = Record<'SUCCESS' | 'FAIL', 'success' | 'fail'>;
