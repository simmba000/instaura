// SelectedServicesContext.js

import React, { createContext, useContext, useState } from "react";

const SelectedServicesContext = createContext();

export const useSelectedServices = () => useContext(SelectedServicesContext);

export const SelectedServicesProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    const index = selectedServices.findIndex((s) => s._id === service._id);
    if (index === -1) {
      setSelectedServices([...selectedServices, service]);
    } else {
      const updatedServices = selectedServices.filter((s) => s._id !== service._id);
      setSelectedServices(updatedServices);
    }
  };

  return (
    <SelectedServicesContext.Provider value={{ selectedServices, toggleService }}>
      {children}
    </SelectedServicesContext.Provider>
  );
};
