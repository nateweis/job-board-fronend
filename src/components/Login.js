import React, {Component} from 'react';

import Auth from '../modules/Auth'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            failedAttempt: false
        }
    } 

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }
    
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({username: this.state.username.toLowerCase()});
        setTimeout(this.submitLogin, 100)
    }

    submitLogin = () => {
        fetch('http://localhost:3001/users',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
               'Content-Type': 'application/json'           
             }
        })
        .then((res) => {
            res.json()
            .then((data) => {
                console.log(data);
                
                if(data.message === "attempt failed"){
                    this.setState({failedAttempt: true,username:"",password:""})
                }else{
                    Auth.authToken(data.token)
                    this.setState({failedAttempt: false,username:"",password:""});
                    this.props.history.push("/jobs/booster/index")
                }
            },(err) => {
                console.log(err)
            }
            )
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="login-form">
                <h2 className="banner">Login</h2>
                <h4 className="wrong-login">{this.state.failedAttempt? "Wrong Username and/or Password":""}</h4>
                <div className="login">
                    <input type="text" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange}/>
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <input type="submit" value="Enter"/>
            </form>
        )
    }
}

export default Login