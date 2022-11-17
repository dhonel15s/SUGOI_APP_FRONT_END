// DEPENDENCIES
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from "react";

// IMPORT: CSS
import './App.css';

// IMPORT: BOOTSTRAP ELEMENTS
import { Container } from 'react-bootstrap';

// IMPORT: USER CONTEXT
import { UserProvider } from './data/userContext.js';

// IMPORT: PAGES
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Products from './pages/Products.js';
import ProductView from './pages/ProductView.js';
import Error from './pages/Error.js';

// IMPORT: COMPONENTS
import AppNavbar from './components/AppNavbar.js';


// APP FUNCTION MAIN --------------------------------------------------------------
function App() {

  // DECLARE USER CONTEXT
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  // USED FOR CLEARING LOCAL STORAGE
  const unsetUser = () =>{
    localStorage.clear(); 
  };

  // ACTIVE CHECKING OF INPUT FIELDS
  useEffect(()=>{
  }, [user])
  useEffect(()=>{

    // FETCH USER DATA FROM DATABASE
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      method: "GET",
      headers:{
        // USE TOKEN FROM LOCAL STORAGE TO GET USER DETAILS
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // IF DATA FROM TOKEN IS VALID
      if(data._id !== undefined){
        // CHANGE USER DATA FROM NULL TO UPDATED
        setUser({
          id: data.details._id,
          isAdmin: data.details.isAdmin
        });
      }
      // IF DATA FROM TOKEN IS INVALID
      else{
        // CHANGE USER DATA TO NULL
        setUser({
          id: null,
          isAdmin: null
        });
      }
      
    })

  }, [])


  // APP MAIN DESIGN------------------------------------------------------------------
  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar/>

        <Container>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/products" element={<Products/>}/>
            <Route exact path="/products/:productId" element={<ProductView />} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="*" element={<Error/>} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
