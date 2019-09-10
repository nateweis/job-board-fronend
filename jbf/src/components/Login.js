import React, {Component} from 'react';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:''
        }
    } 

    render(){
        return(
            <form action="">
                <h2>Login</h2>
                <input type="text"/>
                <input type="password" name="" id=""/>
                <input type="submit" value="Enter"/>
            </form>
        )
    }
}

export default Login