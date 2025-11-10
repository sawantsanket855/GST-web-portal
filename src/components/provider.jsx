import React, { useState } from "react";
import { createContext } from "react";
import { getBalance } from "./controller/agent_data_controller";
export const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState("Sanket");
  const [theme, setTheme] = useState("light");
  const [pageIndex,setPageIndex] = useState(0);
  const [selectedCaCsId, setSelectedCaCsId ] = useState(0);
  const [sidebarIndex,setSidebarIndex]=useState(0);
  const [p_balance,setBalance]=useState(0)
  function p_getBalance(){
    const result=getBalance(); 
    setBalance(result)
  }

  return (
    <AppContext.Provider value={{ 
      user, setUser,
       theme, setTheme ,
       pageIndex,setPageIndex,
       selectedCaCsId, setSelectedCaCsId,
       sidebarIndex,setSidebarIndex,
       p_balance,p_getBalance,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;