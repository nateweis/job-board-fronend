import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login'
import BoosterHome from './components/booster/BoosterHome'
import NavBar from './components/NavBar';
import BoosterShow from './components/booster/BoosterShow'
import BoosterNew from './components/booster/BoosterNew'
import Auth from './modules/Auth'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      archive: false
    }
  }

  changeLogin = (b) => {
    this.setState({loggedIn:b});
  }

  switchToArchive = (bol) => {
    this.setState({archive: bol})
  }

  render(){
    return (
      <BrowserRouter>
        <Route path="/jobs" render={()=>(Auth.getToken()? <NavBar switchToArchive={this.switchToArchive} />: <Redirect to="/login" />)} />
        <Switch>
          <Route path="/" exact render={()=><Redirect to="/login"/>} />
          <Route path="/login" exact render ={({history})=>(!Auth.getToken()? (<Login history={history}/>):(<Redirect to="/jobs/booster/index" />) )} />       
          <Route path="/jobs/booster/index" render ={({history})=> <BoosterHome history={history} archive={this.state.archive} />} />
          <Route path="/jobs/booster/new" component={BoosterNew} />
          <Route path="/jobs/booster/:id" render={({match, history})=><BoosterShow id={match.params.id} push={history.push} /> } />
          <Route render={()=>{return (<div>404 page not found</div>)}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
