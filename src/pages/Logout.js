// IMPORT: DEPENDENCIES
import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";

// IMPORT: USER CONTEXT
import UserContext from '../UserContext.js';


// LOGOUT FUNCTION MAIN --------------------------------------------------------------
export default function Logout(){

	// DECLARE USER CONTEXT
	const { unsetUser, setUser } = useContext(UserContext);

	// RESET DATA STORED IN USERCONTEXT
	unsetUser();


	// CHANGE USER DATA TO NULL
	useEffect(() =>{
		setUser({
			id: null,
			isAdmin: null
		});
	});

	sessionStorage.clear();

	// LOGOUT MAIN DESIGN------------------------------------------------------------------
	return(
		<Navigate to="/login" />
	)
}
