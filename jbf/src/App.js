import React, { Component } from 'react';
import Login from './components/Login'


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
      <div className="App">
        <Login changeLogin={this.changeLogin} />
      </div>
    )
  }
}

export default App;
