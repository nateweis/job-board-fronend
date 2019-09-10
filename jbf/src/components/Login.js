import React, {Component} from 'react';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:''
        }
    } 

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

    render(){
        return(
            <form action="">
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange}/>
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                <input type="submit" value="Enter"/>
            </form>
        )
    }
}

export default Login