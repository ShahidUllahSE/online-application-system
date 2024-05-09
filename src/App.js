import './App.css';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div >

      <Router>
 <Navbar />     
<Routes>
  <Route path='/Home' element={<Home/>}/>
  <Route path='/About' element={<About/>}/>
  <Route path='/Contact' element={<Contact />}/>

</Routes>

      </Router>


    </div>
  );
}

export default App;
