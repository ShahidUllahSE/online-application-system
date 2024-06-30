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
import Completed_Applications from './components/Completed_Applications';
import Pending_Applications from './components/Pending_Applications';
import AdminSideBar from './components/AdminSideBar'
import AddRoles from './components/AddRoles';
import EditRoles from './components/EditRoles';
import FacultySidebar from './components/FacultySidebar';
import FacultyDashboard from './components/FacultyDashboard';
import FacultyCompletedApp from './components/FacultyCompletedApp';
import FacultyPendingApp from './components/FacultyPendingApp';
import FacultyStudentDetails from './components/FacultyStudentDetails';



function App() {
  return (
    <div >

      <Router>
 <Navbar />     
<Routes>
  <Route path='/Home' element={<Home/>}/>
  <Route path='/About' element={<About/>}/>
  <Route path='/Contact' element={<Contact />}/>
  <Route path='/Login' element={<Login />}/>
  <Route path='/Welcome' element={<Welcome />}/>
  <Route path='/Application' element={<OnlineApplication />}/>  
  <Route path='/SideBar' element={<SideBar />}/>
<Route path='/Application2' element={<Application2 />}/> 

<Route path='/AdminAppForms' element={<AdminAppForms />}/> 

<Route path='/Completed-Applications' element={<Completed_Applications />}/> 
 
<Route path='/Pending-Applications' element={<Pending_Applications />}/> 

<Route path='/AdminSideBar' element={<AdminSideBar />}/> 
<Route path='/AddRoles' element={<AddRoles />}/> 
<Route path='/EditRoles' element={<EditRoles />}/> 
<Route path='/FacultySidebar' element={<FacultySidebar/>}/> 
<Route path='/FacultyDashboard' element={<FacultyDashboard/>}/> 
<Route path='/FacultyCompletedApp' element={<FacultyCompletedApp/>}/> 
<Route path='/FacultyPendingApp' element={<FacultyPendingApp/>}/>
<Route path='/FacultyStudentDetails' element={<FacultyStudentDetails/>}/>










</Routes>

      </Router>


    </div>
  );
}

export default App;