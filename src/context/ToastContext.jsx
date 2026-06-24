import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const toast = useRef(null);

  const showToast = options => {
    toast.current?.show(options);
  };

  return (
    <ToastContext.Provider value={showToast}>
      <Toast ref={toast} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
};

export const useAppToast = () => useContext(ToastContext);
