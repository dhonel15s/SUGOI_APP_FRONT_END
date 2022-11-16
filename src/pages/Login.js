// DEPENDENCIES
import { useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";

// IMPORT: BOOTSTRAP ELEMENTS
import { Form, Span, Button, Row, Col } from 'react-bootstrap';

// IMPORT: USER CONTEXT
import UserContext from '../data/userContext.js';

// IMPORT: CSS
import './styles/Login.css';

// LOGIN FUNCTION MAIN
export default function Login() {
	return (
		<>
			<Form className="login-form" >
				<h1>Login</h1>

			    <Form.Label>Email address</Form.Label><br/>
			    <Form.Control type="email" placeholder="e.g user@mail.com" /><br/>

			    <Form.Label>Password</Form.Label><br/>
			    <Form.Control type="password" /><br/>

			    <Button variant="primary" type="submit">Submit</Button>
			</Form>
		</>
	)
}