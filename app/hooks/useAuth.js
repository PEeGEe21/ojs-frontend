import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(token !== null);
  }, []);

  console.log(isLoggedIn, 'is logged in')
  return isLoggedIn;
};
