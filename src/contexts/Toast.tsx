import {ALERT_TYPE} from 'contants/index';
import React from 'react';
import {error, success} from 'utils/message';

const ToastContext = React.createContext<any | null>(null);

const ToastProvider = ({children}: {children: React.ReactNode}) => {
  const renderToast = (msg: string, type: 'success' | 'fail') => {
    if (type === ALERT_TYPE.FAIL) {
      return error(msg);
    }
    return success(msg);
  };
  return (
    <ToastContext.Provider value={renderToast}>
      {children}
    </ToastContext.Provider>
  );
};
const useToasts = () => React.useContext(ToastContext);

export {ToastContext, ToastProvider, useToasts};
