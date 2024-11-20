'use client';
import React, { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


const DashboardMenuContext = createContext(undefined);


const DashboardMenuProvider = ({ children }) => {
    const [showDashMenu, setShowDashMenu] = useState(false);
    const pathname = usePathname();
  
    const toggleDashMenu = () => {
      setShowDashMenu((prev) => !prev);
    };

    // Close menu on route change
    useEffect(() => {
      setShowDashMenu(false);
    }, [pathname]);

  
    return (
      <DashboardMenuContext.Provider value={{ toggleDashMenu, showDashMenu }}>
        {children}
      </DashboardMenuContext.Provider>
    );
  };
  

  export {
    DashboardMenuContext,
    DashboardMenuProvider,
  };
  