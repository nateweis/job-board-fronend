import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Auth from '../modules/Auth'

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            viewState: "Pending................",
            tab:'booster'
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
        this.props.history.push("/jobs/"+this.state.tab+"/index")
    }

    loggout = () => {
        Auth.deauthUser();
        this.props.history.push("/login")
    }

    saveTab = (str) => {
        this.setState({tab:str})        
    }

    render(){ 
        let width = window.innerWidth      
        return(
            <div className="outer-nav-container">
            {width > 930? 
                <div className="nav-container">
                
                <button className="loggout-btn" onClick={this.loggout}>Loggout</button>

                <div className="nav-tab">
                    <button value="Pending................" onClick={this.changeView} >Active</button>
                    <button value="Completed Jobs" onClick={this.changeView} >Completed</button>
                </div>

                <h1>{this.state.viewState}</h1>

                <div style={({color: "white"})}></div>
                    
                <ul className="nav-links" >
                    <li><Link to="/jobs/booster/index"><button onClick={()=> this.saveTab("booster")} >Booster Jobs</button></Link></li> 
                    <li><Link to="/jobs/sewer/index"><button onClick={()=> this.saveTab("sewer")}>Sewer Jobs</button></Link></li>
                    <li><Link to="/jobs/fire/index"><button onClick={()=> this.saveTab("fire")}>Fire Jobs</button></Link></li>                   
                </ul>                
                               
            </div>
            :<button>Stuff</button>}

            <div className="spacer"></div>
            </div>
        )
    }
}

export default withRouter(NavBar)