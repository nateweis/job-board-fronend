import React, { Component } from 'react';
import Auth from '../../modules/Auth'

class NewUserForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            name: "",
            admin: false,
            form_complete: false
        }
    }

    componentDidUpdate(){
        if(this.props.clear){this.resetState();}
    }

    checkFeilds = () => {
        if(this.state.username.trim() && this.state.password.trim() && this.state.name.trim()){
            this.makeNewUser();
            this.props.addUserToList(this.state);
            this.resetState();
        }else{
            this.setState({form_complete: true})
        }
    }

    handleChange = (e) => {     
        let val;

        if(e.target.name === "admin"){
           val = e.target.checked; 
        }    
        else{
            val = e.target.value
        }     
        this.setState({[e.target.name]: val});
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        this.checkFeilds();
    }

    makeNewUser = () => {
        fetch('http://localhost:3001/users/newUser',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : `Token ${Auth.getToken()}`           
             }
        })
        .then((res) => {
            res.json()
            .then((data) => {
                console.log(data);
            },(err) => {
                console.log(err);
            })
        })
    }

    resetState = () => {
        this.props.changeClearform(false);

        this.setState({
            username: "",
            password:"",
            name: "",
            admin: false,
            form_complete: false
        })
    }


    render(){
        return(
            <>
            <form className="form-style" onSubmit={this.handleSubmit}>
                <h3>Add a New User</h3>

                <h4 className="wrong-login">{this.state.form_complete? "One or More Fields Haven't Been Filled":""}</h4>

                <span>
                    <label htmlFor="">Username:  </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                </span>
                
                <span>
                    <label htmlFor="">Password:   </label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </span>

                <span>
                    <label htmlFor="">Name of User:  </label>
                    <input type="text"  name="name" value={this.state.name} onChange={this.handleChange} />
                </span>

                <span>
                    <label htmlFor="">Admin Privlages:   </label>
                    <input type="checkbox" name="admin" checked={this.state.admin? true: false} onChange={this.handleChange} />
                </span>
                
                <input type="submit" value="Submit"/>
            </form>
            </>
        )
    }
}

export default NewUserForm;