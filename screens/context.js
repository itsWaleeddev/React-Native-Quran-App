import React, { createContext, useState } from "react";
const Context = createContext();

export const MyContextProvider = ({ children }) => {
  
  const [font, setFont] = useState(12);
  
  return (
    <Context.Provider
      value={{
        
        font,
        setFont
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
