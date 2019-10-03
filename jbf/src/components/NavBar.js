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
            <div className="outer-nav-container">
            <div className="nav-container">
                
                <button className="loggout-btn" onClick={this.loggout}>Loggout</button>

                <h1>Pending........</h1>
                    
                <ul className="nav-links" >
                    <li><Link to="/jobs/booster/index"><button>Booster Jobs</button></Link></li>                    
                </ul>                
                               
            </div>

            <div className="spacer"></div>
            </div>
        )
    }
}

export default withRouter(NavBar)