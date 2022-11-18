// DEPENDENCIES
import React from "react";

// CREATE CONTEXT OBJECT
const UserContext = React.createContext();


// EXPORT TO OTHER FILES 
export const UserProvider = UserContext.Provider;
export default UserContext;
