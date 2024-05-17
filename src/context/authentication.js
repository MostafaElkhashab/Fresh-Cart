import React, { useEffect, useState } from 'react'
import { createContext } from "react";

export const authContext = createContext();
export default function AuthProvider({ children }) {

  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)


  useEffect(function () {
    if (localStorage.getItem("tkn") !== null) {
      setToken(localStorage.getItem("tkn"))

    }
  }, [])




  return <authContext.Provider value={{ token, setToken, userData, setUserData }}>

    {children}
  </authContext.Provider>
}
