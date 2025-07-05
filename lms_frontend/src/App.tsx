
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css'
import Navigation from "./components/navigation"
import Register from "./components/register"
import Services from "./components/services"
import RenderServiceDetailWrapper from './components/serviceRenderWrapper';

function App() {


  return (
    <Router>
      <Routes>
     <Route path="/" element = {<Register/>}/> 
     <Route path= "/navigation" element = {<Navigation/>}/>
     <Route path= "/services" element = {<Services/>}/>
<Route path="/services/:id" element={<RenderServiceDetailWrapper />} />

      </Routes>
    </Router>
  )
}

export default App
