import { useState, useContext, createContext, useEffect } from "react";
 
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    existUser: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    console.log(data)
    if (data) {
      const parseData = JSON.parse(data);
      setAuth(parseData);
    }
  
    
  }, []);
  

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
