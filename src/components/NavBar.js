import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';
import Auth from '../modules/Auth'
import logo from '../transparent-logo2.png'

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            viewState: "Pending................",
            tab:'booster',
            user: this.props.passdownUser,
            changePassword: false
        }
    }
    

    componentDidMount(){
        document.querySelector(".nav-links-hidden").style.display = "none";
    }

    componentDidUpdate(){
        if(this.state.user.name !== this.props.passdownUser.name){
            this.setState({user:this.props.passdownUser})
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
        this.showLinks(1000)
        this.props.history.push("/jobs/"+this.state.tab+"/index")
    }

    checkDropdown = (e) => {
        const links = document.querySelector(".nav-links-hidden")
        const spacer = document.querySelector(".spacer")
        if(e > 910){
            links.classList.add("full-screen");
            // links.style.display = "none";
            spacer.style.height = "75px";
        }
        else{
            links.classList.remove("full-screen");
            if(links.style.display === "flex") spacer.style.height = "280px";
        }
    }

    homeBtn = () => {
        this.props.history.push("/jobs/"+this.state.tab+"/index")
    }

    loggout = () => {
        Auth.deauthUser();
        this.props.history.push("/login")
    }

    saveTab = (str) => {
        this.setState({tab:str});
        if(document.querySelector(".nav-links-hidden").style.display !== "none") this.showLinks(1000)          
    }

    showLinks = (w) => {
        const links = document.querySelector(".nav-links-hidden");
        const spacer = document.querySelector(".spacer");
        
        if(links.style.display === "none"){
            links.style.display = "flex";
           if(w < 911) spacer.style.height = "280px";
        }else{
            links.style.display = "none";
            spacer.style.height = "75px";
        }
               
    }

    render(){ 
        // let width = window.innerWidth      
        return(
            <div className="outer-container" >
                <ReactResizeDetector handleWidth handleHeight onResize={this.checkDropdown}>

                    {({ width}) => <div>{width > 910? 
                    <div className="nav-container">
                    
                    {/* <button className="loggout-btn" onClick={this.loggout}>Loggout</button> */}
                    <div className="image-container"><img className="logo" onClick={this.homeBtn} src={logo} alt="US Pump"/></div>
                        
                    <ul className="nav-links" >
                        <li><Link to="/jobs/booster/index"><button onClick={()=> this.saveTab("booster")} >Fabrication Jobs</button></Link></li> 
                        <li><Link to="/jobs/sewer/index"><button onClick={()=> this.saveTab("sewer")}>Sewage/Sump</button></Link></li>
                        <li><Link to="/jobs/fire/index"><button onClick={()=> this.saveTab("fire")}>Fire</button></Link></li>                   
                    </ul> 

                    <h1>{this.state.viewState}</h1>

                    <div className="nav-filler">
                        {/* {
                            this.state.viewState === "Pending................"?
                            <button value="Completed Jobs" onClick={this.changeView} >Toggle To Archives</button>
                            :
                            <button value="Pending................" onClick={this.changeView} >Toggle To Pending Jobs</button>
                        } */}
                        
                        
                    </div>

                    <div><button onClick={()=>this.showLinks(width)}><i className="fas fa-bars"></i></button></div>               
                                
                    </div>
                    :
                    <div className="nav-container">
                        <div className="image-container"><img className="logo" onClick={this.homeBtn} src={logo} alt="US Pump"/></div>
                        <h1>{this.state.viewState}</h1>
                        <button onClick={()=>this.showLinks(width)}><i className="fas fa-bars"></i></button>
                    </div>
                    }</div>}

                </ReactResizeDetector>

                <div className="spacer"></div>

                <ul className="nav-links-hidden" >
                    <li id="user-li">Current User is <strong>{this.state.user.name}</strong></li>
                    <li><Link to="/jobs/pass/change"><button onClick={()=> this.saveTab("booster")} >{this.state.user.admin? "Users Settings":"Change Password"}</button></Link></li> 
                    <hr className="in-list-hr"/>
                    <li><Link to="/jobs/booster/index"><button onClick={()=> this.saveTab("booster")} >Fabrication Jobs</button></Link></li> 
                    <li><Link to="/jobs/tankfill/index"><button onClick={()=> this.saveTab("tankfill")} >iTankfill Jobs</button></Link></li> 
                    <li><Link to="/jobs/sewer/index"><button onClick={()=> this.saveTab("sewer")}>Sewage/Sump</button></Link></li>
                    <li><Link to="/jobs/fire/index"><button onClick={()=> this.saveTab("fire")}>Fire</button></Link></li>
                    <li><Link to="/jobs/all/index"><button onClick={()=> this.saveTab("all")}>All Jobs Listed</button></Link></li>
                    <hr className="in-list-hr"/>
                    <li><Link to="/jobs/pass/stock"><button onClick={()=> this.saveTab("booster")} >Stock</button></Link></li>
                    <li>
                        {
                            this.state.viewState === "Pending................"?
                            <button value="Completed Jobs" onClick={this.changeView} >Toggle To Archives</button>
                            :
                            <button value="Pending................" onClick={this.changeView} >Toggle To Pending Jobs</button>
                        }                 
                    </li>
                    <li><button className="loggout-btn" onClick={this.loggout}>Loggout</button></li>                   
                </ul>

            

            </div>
        )
    }
}

export default withRouter(NavBar)