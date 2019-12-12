import React, { Component } from 'react';
import Auth from '../../modules/Auth'

class NewUserForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            name: "",
            admin: false
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


    render(){
        return(
            <>
            <form className="form-style">
                <h3>Add a New User</h3>

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
                    <input type="text"  name="name" val={this.state.name} onChange={this.handleChange} />
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