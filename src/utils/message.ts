import {message} from 'antd';

export const success = () => {
  message.success('This is a success message');
};

export const error = () => {
  message.error('This is an error message');
};

export const warning = () => {
  message.warning('This is a warning message');
};
