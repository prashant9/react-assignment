import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate,useLocation } from 'react-router-dom';
import DrawerExample from './DrawerExample';
import APIProviderDetails from './APIProviderDetails';
const Home = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <div>
      {/*<h1>Home Page</h1>
      <button onClick={goToAbout} className="btn btn-primary">Go to About</button>
      */}
      <DrawerExample/>
    </div>
  );
};

const About = () => {
  const location = useLocation();
  
  const data = location.state || {};
  return(
    <APIProviderDetails apidata={data}/>
  )
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
