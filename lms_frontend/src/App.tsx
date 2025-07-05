import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css'
import Navigation from "./components/navigation"
import Register from "./components/register"
import Services from "./components/services"
import RenderServiceDetail from './components/serviceRender';

function App() {


  return (
    <Router>
      <Routes>
     <Route path="/" element = {<Register/>}/> 
     <Route path= "/navigation" element = {<Navigation/>}/>
     <Route path= "/services" element = {<Services/>}/>
      <Route path= "/RenderServiceDetail" element = {<RenderServiceDetail serviceId = {2}/>}/>
      </Routes>
    </Router>
  )
}

export default App
