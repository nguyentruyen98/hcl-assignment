import {AnyObject, MethodsType} from 'constants/type';

export interface IApiProps {
  url: string;
  method?: MethodsType;
  params?: AnyObject | string | undefined;
  data?: AnyObject | string;
}

export interface IUseApiProps {
  url: string;
  method: MethodsType;
  loadInitialState?: boolean;
  params?: AnyObject | string | undefined;
}
