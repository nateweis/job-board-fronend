import React, { Component } from 'react';
import Auth from '../../modules/Auth'

class UpdateUserForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            name: "",
            admin: false,
            id:0
        }
    }

    componentDidUpdate(){
        if(this.props.user && this.props.user.id !== this.state.id){
            this.setState({
                username: this.props.user.username,
                name: this.props.user.name,
                admin: this.props.user.admin,
                id: this.props.user.id,
                index: this.props.user.index
            })
        }
    }


    deleteUser = () => {
        // this.preventUpdate();
        fetch('https://job-board-api.herokuapp.com/users/' + this.state.id,{
            method:'DELETE',
            headers:{Authorization : `Token ${Auth.getToken()}`}
        })
        .then((res) => {
            res.json()
            .then((data) => {
                // console.log(data);
                this.props.removeUserFromList(this.props.user.index);
                this.props.newUserForm();
            },(err) => {
                console.log(err);             
            })
        })
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
        this.preventUpdate();
        e.preventDefault();
    }

    handleUpdate = () => {
        this.updateUserInBackend();
        this.props.updateUserFromList(this.state);
    }

    preventUpdate = () => {
        if(this.state.id === undefined){
            alert("User information is still being updated. Please try again.");
            window.location.reload();
        }
    }

    updateUserInBackend = () => {
        fetch('https://job-board-api.herokuapp.com/users/anyUser',{
            method: 'PUT',
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
                // console.log(data);
            },(err) => {
                console.log(err);
            })
        })
    }



    render(){
        return(
            <>
            
            
            <form className="form-style" onSubmit={this.handleSubmit}>
                <h3>Update {this.props.user? this.props.user.name: "User"}'s Profile</h3>

                <span><button onClick={this.deleteUser}>Delete User</button></span>
                
                <span>
                    <label htmlFor="">Username:  </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                </span>
                
                {/* <span>
                    <input type="password" name="password" value={this.state.password} />
                </span> */}

                <span>
                    <label htmlFor=""> Name of User:   </label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                </span>

                <span>
                    <label htmlFor="">Admin Privlages:  </label>
                    <input type="checkbox" name="admin" checked={this.state.admin? true : false} onChange={this.handleChange} />
                </span>

                <input type="submit" value="Update User" onClick={this.handleUpdate}/>
            </form>
            </>
        )
    }
}

export default UpdateUserForm;