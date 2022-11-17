// IMPORT: DEPENDENCIES
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP ELEMENTS
import {Form, Button, Image} from 'react-bootstrap';

// IMPORT: USER CONTEXT
import UserContext from '../data/userContext';

// IMPORT: CSS
import "./styles/Register.css";


// REGISTER FUNCTION MAIN --------------------------------------------------------------
export default function Register(){
    
    // DECLARE USER CONTEXT
    const { user } = useContext(UserContext);

    // USED FOR NAVIGATING TO OTHER PAGE
    const navigate = useNavigate();

    // SET INITIAL VALUE TO REGISTRATION DETAILS
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // SUBMIT BUTTON DEFAULT VALUE
    const [isActive, setIsActive] = useState(false);

    // ACTIVE CHECKING IF INPUT FIELDS ARE NOT EMPTY
    useEffect(() =>{
        // IF ALL FIELD ARE COMPLETE AND PASSWORD WAS RECONFIRMED, ENABLE SUBMIT BUTTON
        if((firstName !== '' && lastName !=='' && email !== '' && password !== '' && confirmPassword !=='') && (password === confirmPassword)){
            setIsActive(true);
        }
        // IF NOT, DISABLE SUBMIT BUTTON
        else{
            setIsActive(false);
        }

    }, [firstName, lastName, email, password, confirmPassword])


    // REGISTER FUNCTIONS -----------------------------------------------------------------
    function registerUser(event){
        
        // PREVENT PAGE FROM AUTO RELOAD
        event.preventDefault();

        // FETCH USER DATA FROM DATABASE
        fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            // PASS INPUT EMAIL & PASSWORD AND CONVERT TO JSON FORMAT
            body: JSON.stringify({
                email: email
            })
        })
        .then(response => response.json())
        .then(data =>{

            if(data){
                Swal.fire({
                    title: "Sorry. Email already in use.",
                    icon: "error",
                    text: "Kindly provide another email to complete the registration."
                })
            }
            else{

                fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {

                    if(data){
                        Swal.fire({
                            title: "Registration Successful",
                            icon: "success",
                            text: "Hi ${firstName} Welcome to Sugoi!"
                        });
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        navigate("/login");
                    }
                    else{

                        Swal.fire({
                            title: "Something went wrong",
                            icon: "error",
                            text: "Please try again."
                        });

                    }
                })


            }
        })
    }


    // REGISTER MAIN DESIGN------------------------------------------------------------------
    return(

        <>
            <Image src={require('../assets/logo.jpg')} width="40" className="d-block m-auto"/>
            <h1 className="my-5 mt-0 text-center">Register</h1>
            <Form onSubmit={event => registerUser(event)}>

            {/*FIRST NAME INPUT*/}
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    // DURING INPUT, PASS THE DATA IN THE FIELD TO "firstName"
                    onChange={event => setFirstName(event.target.value)}
                    required
                />
            </Form.Group>

            {/*LAST NAME INPUT*/}
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    // DURING INPUT, PASS THE DATA IN THE FIELD TO "lastName"
                    onChange={event => setLastName(event.target.value)}
                    required
                />
            </Form.Group>

            {/*EMAIL INPUT*/}
            <Form.Group className="mb-3" controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    // DURING INPUT, PASS THE DATA IN THE FIELD TO "email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                    required
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            {/*PASSWORD INPUT*/}
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password" 
                    placeholder="Enter Password"
                    value={password}
                    // DURING INPUT, PASS THE DATA IN THE FIELD TO "password"
                    onChange={event => setPassword(event.target.value)}
                    required
                />
            </Form.Group>

            {/*CONFIRM PASSWORD INPUT*/}
            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control
                    type="password" 
                    placeholder="Verify Password"
                    value={confirmPassword}
                    // DURING INPUT, PASS THE DATA IN THE FIELD TO "confirmPassword"
                    onChange={event => setConfirmPassword(event.target.value)}
                    required
                />
            </Form.Group>
            {
                isActive
                ?
                    <Button type="submit" id="submitBtn">SUBMIT</Button>
                :
                    <Button type="submit" id="submitBtn" disabled>SUBMIT</Button>
            }
            </Form>
        </>
    )
}