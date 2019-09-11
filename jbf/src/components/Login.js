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
    
    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/users',{
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
                this.setState({username:"",password:""});
                this.props.changeLogin(true);
            },(err) => {
                console.log(err)
            }
            )
        })

        
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} >
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange}/>
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                <input type="submit" value="Enter"/>
            </form>
        )
    }
}

export default Login