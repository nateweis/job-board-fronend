import React, { Component } from 'react';
import Auth from '../../modules/Auth'

class UpdateUserForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            name: "",
            admin: false,
        }
    }

    componentDidUpdate(){
        if(this.props.user && this.props.user.username !== this.state.username){
            this.setState({
                username: this.props.user.username,
                name: this.props.user.name,
                admin: this.props.user.admin,
                id: this.props.user.id
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

    handleSubmit = (e) => {
        this.preventUpdate();
        e.preventDefault();
    }

    handleUpdate = () => {
        this.delayFunc();
        console.log("We got a second btn going");
    }

    preventUpdate = () => {
        if(this.state.id === undefined){
            console.log("normally delete would be prvented");
        }
    }



    render(){
        return(
            <>
            
            
            <form className="form-style" onSubmit={this.handleSubmit}>
                <h3>Update {this.props.user? this.props.user.name: "User"}'s Profile</h3>

                <span><button onClick={this.deleteUser}>Delete User</button></span>
                
                <span>
                    <input type="text" name="username" value={this.state.username} />
                </span>
                
                {/* <span>
                    <input type="password" name="password" value={this.state.password} />
                </span> */}

                <span>
                    <input type="text" name="name" value={this.state.name} />
                </span>

                <span>
                    <input type="checkbox" name="admin" checked={this.state.admin? true : false} />
                </span>

                <input type="submit" value="Update User" onClick={this.handleUpdate}/>
            </form>
            </>
        )
    }
}

export default UpdateUserForm;