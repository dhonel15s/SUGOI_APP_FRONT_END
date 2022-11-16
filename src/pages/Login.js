// IMPORT: DEPENDENCIES
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// IMPORT: BOOTSTRAP ELEMENTS
import { Form, Button } from 'react-bootstrap';

// IMPORT: USER CONTEXT
import UserContext from '../data/userContext.js';


// LOGIN FUNCTION MAIN --------------------------------------------------------------
export default function Login() {

	// DECLARE USER CONTEXT
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// DECLARE INITIAL STATE FOR INPUT FIELDS
	const [isActive, setIsActive] = useState(false);

	// ACTIVE CHECKING OF INPUT FIELDS
	useEffect(() => {

	    if(email !== '' && password !== ''){
	        setIsActive(true);
	    }else{
	        setIsActive(false);
	    }

	}, [email, password]);


	// LOGIN FUNCTIONS -----------------------------------------------------------------

	// This function checks the input email and password from Database
	function authenticate(event) {

		// PREVENT PAGE FROM AUTO RELOAD
	    event.preventDefault();

	    // FETCH USER DATA FROM DATABASE
	    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json"
	        },
	        // PASS INPUT EMAIL & PASSWORD AND CONVERT TO JSON FORMAT
	        body: JSON.stringify({
	            email: email,
	            password: password
	        })
	    })
	    .then(response => response.json())
	    .then(data => {

	        // CHECK LOGIN VALIDITY
	        // IF TOKEN IS NOT EMPTY (Valid credentials):
	        if(data.accessToken !== undefined){

	        	// ADD TOKEN TO LOCAL STORAGE
	            localStorage.setItem("token", data.accessToken);

	            // CALL FUNCTION TO RETRIEVE USER DETAILS FROM TOKEN
	            retrieveUserDetails(data.accessToken);

	            Swal.fire({
	                title: "Login Successful",
	                icon: "success",
	                text: "Welcome to Zuitt!"
	            });
	        }
	        else{
	        	// IF EMPTY TOKEN (Invalid credentials):
	            Swal.fire({
	                title: "Authentication Failed!",
	                icon: "error",
	                text: "Check your login details and try again."
	            });
	        }
	    });

	    setEmail('');
	    setPassword('');

	}



	// This function retrieves user details using the retrieved Token after login
	const retrieveUserDetails = (token) => {

		// FETCH FROM USER DETAILS DATABASE
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
		    method: "GET",
		    headers:{
		        Authorization: `Bearer ${token}`
		    }
		})
		.then(response => response.json())
		.then(data => {

		    // STORE RETRIEVED USER DATA FROM TOKEN TO USER CONTEXT
		    setUser({
		        id: data._id,
		        isAdmin: data.isAdmin
		    });
		})
	}

	// LOGIN MAIN HTML------------------------------------------------------------------
	return (
		(user.id !== null)
		?
			<Navigate to="/products"/>
		:
		<>
			<h1>Login</h1>
			<Form  onSubmit={(event) => authenticate(event)} className="col-md-3 p-3">

				{/*EMAIL INPUT*/}
				<Form.Group className="mb-3" controlId="formBasicEmail">
			  		<Form.Label>Email address</Form.Label>
			  		<Form.Control
			  			type="email"
			  			// VALUE OF EMAIL INPUT FIELD
			  			value={email}
			  			// DURING INPUT, PASS THE DATA IN THE FIELD TO "EMAIL"
			  			onChange={(event) => setEmail(event.target.value)}
			  			required
			  		/>
				</Form.Group>

				{/*PASSWORD INPUT*/}
				<Form.Group className="mb-3" controlId="formBasicPassword">
			        <Form.Label>Password</Form.Label>
			        <Form.Control
			        	type="password"
			        	// VALUE OF PASSWORD INPUT FIELD
			        	value={password}
			        	// DURING INPUT, PASS THE DATA IN THE FIELD TO "PASSWORD"
			        	onChange={(event) => setPassword(event.target.value)}
			        	required
			        />
				</Form.Group>

				{/*CHECKING IF EMAIL AND PASSWORD FIELD IS EMPTY OR NOT*/}
				{
					isActive ?
						// IF INPUT FIELDS ARE COMPLETE
						<Button variant="primary" type="submit" id="submitBtn">Login</Button>
					:
						// IF INPUT FIELDS ARE EMPTY
						<Button variant="primary" type="submit" id="submitBtn" disabled>Login</Button>
				}

				
			</Form>
		</>
	)
}