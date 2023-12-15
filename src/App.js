import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Cbir from './components/Cbir.jsx';
import Home from './components/Home.jsx';
import Aboutus from './components/Aboutus.jsx';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='' element ={<Home/>}/>
        <Route path='/CBIR' element ={<Cbir/>}/>
        <Route path='/about-us' element ={<Aboutus/>}/>
      </Routes>
    </Router>
  );
}

export default App;