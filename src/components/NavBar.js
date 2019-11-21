import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';
import Auth from '../modules/Auth'

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            viewState: "Pending................",
            tab:'booster'
        }
    }

    componentDidMount(){
        document.querySelector(".nav-links-hidden").style.display = "none";
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

    checkDropdown = (e) => {
        const links = document.querySelector(".nav-links-hidden")
        const spacer = document.querySelector(".spacer")
        if(e > 930){
            links.style.display = "none";
            spacer.style.height = "75px";
        }
    }

    loggout = () => {
        Auth.deauthUser();
        this.props.history.push("/login")
    }

    saveTab = (str) => {
        this.setState({tab:str})        
    }

    showLinks = () => {
        const links = document.querySelector(".nav-links-hidden")
        const spacer = document.querySelector(".spacer")

        if(links.style.display === "none"){
            links.style.display = "flex";
            spacer.style.height = "190px";
        }else{
            links.style.display = "none";
            spacer.style.height = "75px";
        }
               
    }

    render(){ 
        // let width = window.innerWidth      
        return(
            <div className="outer-nav-container" >
                <ReactResizeDetector handleWidth handleHeight onResize={this.checkDropdown}>

                    {({ width}) => <div>{width > 930? 
                    <div className="nav-container">
                    
                    <button className="loggout-btn" onClick={this.loggout}>Loggout</button>

                    <div>
                        {
                            this.state.viewState === "Pending................"?
                            <button value="Completed Jobs" onClick={this.changeView} >Toggle To Archives</button>
                            :
                            <button value="Pending................" onClick={this.changeView} >Toggle To Pending Jobs</button>
                        }
                        
                        
                    </div>

                    <h1>{this.state.viewState}</h1>

                    <div style={({color: "white"})}></div>
                        
                    <ul className="nav-links" >
                        <li><Link to="/jobs/booster/index"><button onClick={()=> this.saveTab("booster")} >iBoost Jobs</button></Link></li> 
                        <li><Link to="/jobs/sewer/index"><button onClick={()=> this.saveTab("sewer")}>iLevel Sewer</button></Link></li>
                        <li><Link to="/jobs/fire/index"><button onClick={()=> this.saveTab("fire")}>iLevel Tankfill</button></Link></li>                   
                    </ul>                
                                
                    </div>
                    :
                    <div className="nav-container">
                        <button className="loggout-btn" onClick={this.loggout}>Loggout</button>
                        <h1>{this.state.viewState}</h1>
                        <button onClick={this.showLinks}><i className="fas fa-bars"></i></button>
                    </div>
                    }</div>}

                </ReactResizeDetector>

                <div className="spacer"></div>

                <ul className="nav-links-hidden" >
                    <li>
                        {
                            this.state.viewState === "Pending................"?
                            <button value="Completed Jobs" onClick={this.changeView} >Toggle To Archives</button>
                            :
                            <button value="Pending................" onClick={this.changeView} >Toggle To Pending Jobs</button>
                        }                 
                    </li>
                    <li><Link to="/jobs/booster/index"><button onClick={()=> this.saveTab("booster")} >Booster Jobs</button></Link></li> 
                    <li><Link to="/jobs/sewer/index"><button onClick={()=> this.saveTab("sewer")}>Sewer Jobs</button></Link></li>
                    <li><Link to="/jobs/fire/index"><button onClick={()=> this.saveTab("fire")}>Fire Jobs</button></Link></li>                   
                </ul>
            

            </div>
        )
    }
}

export default withRouter(NavBar)