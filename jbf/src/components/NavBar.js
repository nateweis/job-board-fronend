import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Auth from '../modules/Auth'

class NavBar extends Component{
    loggout = () => {
        Auth.deauthUser();
        this.props.history.push("/login")
    }
    render(){       
        return(
            <div className="nav-container">
                
                <button className="loggout-btn" onClick={this.loggout}>Loggout</button>
                    
                <ul className="nav-links" >
                    <li><Link to="/jobs/booster/index"><button>Booster Jobs</button></Link></li>                    
                </ul>                
                               
            </div>
        )
    }
}

export default withRouter(NavBar)