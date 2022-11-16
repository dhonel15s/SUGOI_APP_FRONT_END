// DEPENDENCIES
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// IMPORT: CSS
import './App.css';

// IMPORT: PAGES
import Login from './pages/Login.js';



function App() {
  return (

    <Router>
      <Login/>
    </Router>

  );
}

export default App;
