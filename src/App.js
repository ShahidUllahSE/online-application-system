import './App.css';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import OnlineApplication from './components/OnlineApplication';
import Application2 from './components/Application2';
import AdminAppForms from './components/AdminAppForms';
import SideBar from './components/SideBar';

function App() {
  return (
    <div >

      <Router>
 <Navbar />     
<Routes>
  {/* <Route path='/Home' element={<Home/>}/>
  <Route path='/About' element={<About/>}/> */}
  <Route path='/Contact' element={<Contact />}/>
  <Route path='/Login' element={<Login />}/>
  <Route path='/Welcome' element={<Welcome />}/>
  {/* <Route path='/Application' element={<OnlineApplication />}/> */}
  <Route path='/SideBar' element={<SideBar />}/>
<Route path='/Application2' element={<Application2 />}/> 

<Route path='/AdminAppForms' element={<AdminAppForms />}/> 





</Routes>

      </Router>


    </div>
  );
}

export default App;
