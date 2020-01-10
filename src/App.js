//***************************************************** */
// Heroku Site :  https://uspump-jobs.herokuapp.com/ 
//***************************************************** */

import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Auth from './modules/Auth';
import Login from './components/Login';
import NavBar from './components/NavBar';
import ChangePassword from './components/ChangePassword';
import BoosterHome from './components/booster/BoosterHome';
import BoosterShow from './components/booster/BoosterShow';
import BoosterNew from './components/booster/BoosterNew';
import SewageHome from './components/sewage/SewageHome';
import SewageNew from './components/sewage/SewageNew';
import SewageShow from './components/sewage/SewageShow';
import FireHome from './components/fire/FireHome';
import FireNew from './components/fire/FireNew';
import FireShow from './components/fire/FireShow';
import TankfillHome from './components/tankfill/TankfillHome';
import TankfillNew from './components/tankfill/TankfillNew';
import TankfillShow from './components/tankfill/TankfillShow';
import AllJobsHome from './components/allJobs/AllJobsHome';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      archive: false,
      user: {name:"Unknown"}
    }
  }

  changeLogin = (b) => {
    this.setState({loggedIn:b});
  }

  passdownUser = (user) => {
    this.setState({user:user});
  }

  SpellOutDate = (props) => {
       
    let d = new Date(props.date)
    d= d.toDateString();

    if(props.date === null){
        d = ""         
    }
    
    return(<>{d}</>)
}

  switchToArchive = (bol) => {
    this.setState({archive: bol})
  }

  render(){
    return (
      <BrowserRouter>
        <Route path="/jobs" render={()=>(Auth.getToken()? <NavBar switchToArchive={this.switchToArchive} passdownUser={this.state.user} />: <Redirect to="/login" />)} />
        <Switch>
          <Route path="/" exact render={()=><Redirect to="/login"/>} />
          <Route path="/login" exact render ={({history})=>(!Auth.getToken()? (<Login history={history}/>):(<Redirect to="/jobs/booster/index" />) )} /> 

          <Route path="/jobs/pass/change" exact render={({history})=><ChangePassword passdownUser={this.state.user} push={history.push} />} />
                
          <Route path="/jobs/booster/index" exact render ={({history})=> <BoosterHome history={history} retriveUser={this.passdownUser} SpellOutDate={this.SpellOutDate} archive={this.state.archive} />} />
          <Route path="/jobs/booster/new" exact component={BoosterNew} />
          <Route path="/jobs/booster/:id" render={({match, history})=><BoosterShow id={match.params.id} SpellOutDate={this.SpellOutDate} push={history.push} /> } />

          <Route path="/jobs/tankfill/index" exact render ={({history})=> <TankfillHome history={history} retriveUser={this.passdownUser} SpellOutDate={this.SpellOutDate} archive={this.state.archive} />} />
          <Route path="/jobs/tankfill/new" exact component={TankfillNew} />
          <Route path="/jobs/tankfill/:id" render={({match, history})=><TankfillShow id={match.params.id} SpellOutDate={this.SpellOutDate} push={history.push} /> } />

          <Route path="/jobs/sewer/index" exact render ={({history})=> <SewageHome history={history} SpellOutDate={this.SpellOutDate} archive={this.state.archive} />} />
          <Route path="/jobs/sewer/new" exact component={SewageNew} />
          <Route path="/jobs/sewer/:id" exact render={({match, history})=><SewageShow id={match.params.id} SpellOutDate={this.SpellOutDate} push={history.push} /> } />

          <Route path="/jobs/fire/index" exact render ={({history})=> <FireHome history={history} SpellOutDate={this.SpellOutDate} archive={this.state.archive} />} />
          <Route path="/jobs/fire/new" exact component={FireNew} />
          <Route path="/jobs/fire/:id" exact render={({match, history})=><FireShow id={match.params.id} SpellOutDate={this.SpellOutDate} push={history.push} /> } />

          <Route path="/jobs/all/index" exact render ={({history})=> <AllJobsHome history={history} retriveUser={this.passdownUser} SpellOutDate={this.SpellOutDate} archive={this.state.archive} />} />

          <Route render={()=>{return (<div>404 page not found</div>)}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
