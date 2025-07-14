import React, { createContext, useState, useContext } from 'react';

const VirtualizationContext = createContext();

export const VirtualizationProvider = ({ children }) => {
  const [virtualProduct, setVirtualProduct] = useState(null);

  return (
    <VirtualizationContext.Provider value={{ virtualProduct, setVirtualProduct }}>
      {children}
    </VirtualizationContext.Provider>
  );
};

export const useVirtualization = () => useContext(VirtualizationContext);