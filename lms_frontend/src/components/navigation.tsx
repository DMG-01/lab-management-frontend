
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from "react-router-dom"

function Navigation() {


    return(
        <>
        <div className="dashboard">
            <div><Link to="/" className="dashLink"><i className="bi bi-people-fill"></i></Link></div>
            <div><Link to="/services" className="dashLink"><i className="bi bi-journal-medical"></i></Link></div> 
            <div><Link to="/patient" className="dashLink"><i className="bi bi-person-plus-fill"></i></Link></div>
            
        </div>
        </>
    ) 
}

export default Navigation