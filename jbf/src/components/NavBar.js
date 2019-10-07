import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Auth from '../modules/Auth'

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            viewState: "Pending................"
        }
    }

    changeView = (e) => {
        if(e.target.value === "Completed Jobs"){
            this.props.switchToArchive(true)
        }
        else{
            this.props.switchToArchive(false)
        }
        this.setState({viewState: e.target.value})
        this.props.history.push("/jobs/booster/index")
    }

    loggout = () => {
        Auth.deauthUser();
        this.props.history.push("/login")
    }
    render(){       
        return(
            <div className="outer-nav-container">
            <div className="nav-container">
                
                <button className="loggout-btn" onClick={this.loggout}>Loggout</button>

                <div>
                    <button value="Pending................" onClick={this.changeView} >Active</button>
                    <button value="Completed Jobs" onClick={this.changeView} >Completed</button>
                </div>

                <h1>{this.state.viewState}</h1>

                <div></div>
                    
                <ul className="nav-links" >
                    <li><Link to="/jobs/booster/index"><button>Booster Jobs</button></Link></li> 
                    <li><Link to="/jobs/sewer/index"><button>Sewer Jobs</button></Link></li>
                    <li><button>Fire Jobs</button></li>                   
                </ul>                
                               
            </div>

            <div className="spacer"></div>
            </div>
        )
    }
}

export default withRouter(NavBar)