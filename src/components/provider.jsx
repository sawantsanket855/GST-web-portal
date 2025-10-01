import React, { useState } from "react";
import { createContext } from "react";
export const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState("Sanket");
  const [theme, setTheme] = useState("light");
  const [requestPageIndex,setRequestPageIndex] = useState(0);
  const [selectedCaCsId, setSelectedCaCsId ] = useState(0);

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme ,requestPageIndex,setRequestPageIndex,selectedCaCsId, setSelectedCaCsId}}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;