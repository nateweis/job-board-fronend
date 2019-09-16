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
            <div>
                <button onClick={this.loggout}>Loggout</button>
                <Link to="/jobs/booster/index"><button>Booster Jobs</button></Link>
            </div>
        )
    }
}

export default withRouter(NavBar)