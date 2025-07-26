
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

//import './App.css'
//import "./index.css"
import Navigation from "./components/navigation"
import Register from "./components/register"
import Services from "./components/services"
import Patient from "./components/patient"
import Referral from "./components/referral"
import LoginSignUp from './components/loginSignUp';
import {RenderServiceDetailWrapper, RenderViewRegisterWrapper, RenderPatientDetailWrapper} from './components/serviceRenderWrapper';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element = {<LoginSignUp/>}></Route>
     <Route path="/dashboard" element = {<Register/>}/> 
     <Route path= "/navigation" element = {<Navigation/>}/>
     <Route path= "/services" element = {<Services/>}/>
     <Route path= "/patient" element = {<Patient/>}/>
     <Route path ="/referral" element = {<Referral/>}/>
<Route path="/services/:id" element={<RenderServiceDetailWrapper />} />
<Route path="/viewRegisterPage/:id" element={<RenderViewRegisterWrapper/>} />
<Route path="/viewPatientDetail/:id" element={<RenderPatientDetailWrapper/>} />

      </Routes>
    </Router>
  )
}

export default App
