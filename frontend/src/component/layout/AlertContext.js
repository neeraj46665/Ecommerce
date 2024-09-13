// src/AlertContext.js
import React, { createContext, useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = (message, variant = "success") => {
    setAlert({ message, variant });
    setAlertVisible(true);
    setTimeout(() => {
      setAlert(null);
      setAlertVisible(false);
    }, 5000); // Hide alert after 5 seconds
  };

  const closeAlert = () => {
    setAlert(null);
    setAlertVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, alertVisible }}>
      {alert && (
        <Alert variant={alert.variant} onClose={closeAlert} dismissible>
          {alert.message}
        </Alert>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
