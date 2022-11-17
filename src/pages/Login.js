// IMPORT: DEPENDENCIES
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// IMPORT: BOOTSTRAP ELEMENTS
import { Row, Col, Form, Button, Image } from 'react-bootstrap';

// IMPORT: USER CONTEXT
import UserContext from '../data/userContext.js';

// IMPORT: CSS
import "./styles/Login.css";


// LOGIN FUNCTION MAIN --------------------------------------------------------------
export default function Login() {

	// DECLARE USER CONTEXT
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// SUBMIT BUTTON DEFAULT VALUE
	const [isActive, setIsActive] = useState(false);

	// ACTIVE CHECKING IF INPUT FIELDS ARE NOT EMPTY
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

	// LOGIN MAIN DESIGN------------------------------------------------------------------
	return (
		(user.id !== null)
		?
			<Navigate to="/products"/>
		:
		<>	
			<Row className="login-row d-flex flex-row justify-content-around align-items-center text-center">
				<Col xs={11} md={5}>
				<Image src={require('../assets/logo.jpg')} width="40" className="d-block m-auto"/>
				<p className="form-title">Login</p>
				<Form  onSubmit={(event) => authenticate(event)} className="form-body border m-auto p-5 shadow">

					{/*EMAIL INPUT*/}
					<Form.Group className="mb-3" controlId="formBasicEmail">
				  		<Form.Label className="form-label">EMAIL ADDRESS</Form.Label>
				  		<Form.Control
				  			className="form-input py-2"
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
				        <Form.Label className="form-label">PASSWORD</Form.Label>
				        <Form.Control
				        	className="form-input py-2"
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
							<Button className="login-button px-5" variant="primary" type="submit" id="submitBtn">LOGIN</Button>
						:
							// IF INPUT FIELDS ARE EMPTY
							<Button className="login-button px-5" variant="primary" type="submit" id="submitBtn" disabled>LOGIN</Button>
					}

					
				</Form>
				</Col>
			</Row>
		</>
	)
}