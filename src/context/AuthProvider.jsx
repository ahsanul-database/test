import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
  // all state---------------------------------
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      "https://cse-jnu-server.vercel.app/allDataofCSE13"
    )
      .then((res) => res.json())
      .then((data) => setStudentData(data));
  }, []);

  const authInfo = {
    name: "abir",
    studentData,
    loading,
    setLoading,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
