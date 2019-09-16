import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login'
import BoosterHome from './components/BoosterHome'
import Auth from './modules/Auth'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  changeLogin = (b) => {
    this.setState({loggedIn:b});
  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/login" exact render ={()=>(!Auth.getToken()? <Login />:<Redirect to="/jobs/booster/index" /> )} />
        <Route path="/jobs/booster/index" render ={()=>(Auth.getToken()? <BoosterHome />: <Redirect to="/login" />)} />
        <Route path="/" render={()=>{return (<div>404 page not found</div>)}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
