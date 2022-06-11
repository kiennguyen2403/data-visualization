
import {React} from 'react';
import Map from './components/map';
import About from './components/aboutpage';
import Production from './components/production';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import "./App.css";




function App() {
  return (
  
    <div  id ="App">
    <Router basename="/">
      <header id="navigation_bar">
        <nav>
          <ul>
            <div id="logo">
              <li><Link to="/"> Energeta</Link></li>
            </div>
            <div id ="tools">
            
              <li> <Link to="/">Consumption visualization</Link></li>
              <li> <Link to="/production">Production visualization</Link></li>
              <li> <Link to="/about">About us</Link></li>
            </div>
          </ul>
        </nav>
      </header>
      
      <Routes> 
      <Route path="/datavisualization" element={<About/>}></Route>  
        <Route path="/" element={<Map/>}></Route>
        <Route path="/production" element={<Production/>}></Route>
        <Route path="/about" element={<About/>}></Route>
      </Routes>

    </Router>
    <ul id="footer">
        <div id="logo_footer">
        <li> 
        Energeta
        </li>
        </div>
        <div id="text_footer">
        <li>
        <ul id="Contact">
        <li className="heading">Contact </li> 
        <li><a href="mailto:kientdn2403@gmail.com">Gmail</a></li>
        <li><a href="https://www.facebook.com/profile.php?id=100013395218389">Facebook</a></li>
        </ul>
        </li>
        </div>
      </ul>
    </div>
  );
}

export default App;
