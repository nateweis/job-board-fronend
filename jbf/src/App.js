import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login'
import BoosterHome from './components/BoosterHome'


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
        <Route path="/" exact render ={()=><Login changeLogin={this.changeLogin} />} />
        <Route path="/booster/jobs/index" component={BoosterHome} />
        <Route path="/" render={()=>{return (<div>404 page not found</div>)}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
