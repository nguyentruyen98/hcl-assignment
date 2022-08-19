import {message} from 'antd';

export const success = (msg: string) => {
  message.success(msg);
};

export const error = (msg: string) => {
  message.error(msg);
};

export const warning = (mgs: string) => {
  message.warning(mgs);
};
