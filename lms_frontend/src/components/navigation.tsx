
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from "react-router-dom"

function Navigation() {


    return(
        <>
        <div className="dashboard">
            <div><Link to="/" class="dashLink"><i className="bi bi-people-fill"></i></Link></div>
            <div><Link to="/services" class="dashLink"><i className="bi bi-journal-medical"></i></Link></div> 
            
        </div>
        </>
    ) 
}

export default Navigation