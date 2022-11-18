// IMPORT: DEPENDENCIES
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// IMPORT: BOOTSTRAP ELEMENTS
import { Form, Button, Image, Row , Col } from 'react-bootstrap';

// IMPORT: USER CONTEXT
import UserContext from '../UserContext';

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
            <Row className="d-flex flex-row justify-content-around align-items-center">
                <Col xs={11} md={7} lg={5}>
                <Image src={require('../assets/logo.jpg')} width="40" className="d-block m-auto mt-2"/>
                <h1 className="text-center form-title">Register</h1>
                <Form onSubmit={event => registerUser(event)} className="form-body border m-auto p-5 shadow-sm">

                {/*FIRST NAME INPUT*/}
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label className="form-label">First Name</Form.Label>
                    <Form.Control
                        className="form-input py-2"
                        type="text"
                        placeholder="e.g Juan"
                        value={firstName}
                        // DURING INPUT, PASS THE DATA IN THE FIELD TO "firstName"
                        onChange={event => setFirstName(event.target.value)}
                        required
                    />
                </Form.Group>

                {/*LAST NAME INPUT*/}
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label className="form-label">Last Name</Form.Label>
                    <Form.Control
                        className="form-input py-2"
                        type="text"
                        placeholder="e.g Dela Cruz"
                        value={lastName}
                        // DURING INPUT, PASS THE DATA IN THE FIELD TO "lastName"
                        onChange={event => setLastName(event.target.value)}
                        required
                    />
                </Form.Group>

                {/*EMAIL INPUT*/}
                <Form.Group className="mb-3" controlId="emailAddress">
                    <Form.Label className="form-label">Email Address</Form.Label>
                    <Form.Control
                        className="form-input py-2"
                        type="email"
                        placeholder="e.g juandelacruz@mail.com"
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
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                        className="form-input py-2"
                        type="password" 
                        placeholder="e.g juan1234"
                        value={password}
                        // DURING INPUT, PASS THE DATA IN THE FIELD TO "password"
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </Form.Group>

                {/*CONFIRM PASSWORD INPUT*/}
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label className="form-label">Verify Password</Form.Label>
                    <Form.Control
                        className="form-input py-2"
                        type="password" 
                        placeholder="retype password for confirmation"
                        value={confirmPassword}
                        // DURING INPUT, PASS THE DATA IN THE FIELD TO "confirmPassword"
                        onChange={event => setConfirmPassword(event.target.value)}
                        required
                    />
                </Form.Group>
                {
                    isActive
                    ?
                        <Button className="login-button px-5" type="submit" id="submitBtn">SUBMIT</Button>
                    :
                        <Button className="login-button px-5" type="submit" id="submitBtn" disabled>SUBMIT</Button>
                }
                </Form>
                </Col>
            </Row>
        </>
    )
}