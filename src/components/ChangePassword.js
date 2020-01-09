import React, { Component } from 'react';
import Auth from '../modules/Auth'
import NewUserForm from './userForms/NewUserForm'
import UpdateUserForm from './userForms/UpdateUserForm'
import ChangePasswordForm from './userForms/ChangePasswordForm'

class ChangePassword extends Component{
    constructor(props){
        super(props)       
        this.state = {
            user: this.props.passdownUser,
            clear_form: false,
            switch_form: 1
        }
    }

    componentDidMount(){
        
        if(this.state.user.name === "Unknown"){
            this.props.push("/jobs/booster/index")
        }
        if(this.state.user.admin === true){this.getAllUsers()}
    }

    componentDidUpdate(){
        if(this.state.user.name !== this.props.passdownUser.name){
            this.setState({user:this.props.passdownUser})
        }
    }

    addUserToList = (user) => {
        this.setState({listOfUsers: [...this.state.listOfUsers, user]})
    }

    changeClearform = (bool) => {
        this.setState({clear_form: bool})
    }

    changePass = () => {
        this.setState({switch_form: 3});
    }

    getAllUsers = () => {
        fetch('https://job-board-api.herokuapp.com/users',{
            method:"GET",
            headers:{
                Authorization : `Token ${Auth.getToken()}`
            }
        })
        .then((res) => {
            res.json()
            .then((data)=>{
                // console.log(data);
                this.setState({listOfUsers: data.allUserInfo})
            },(err)=>{console.log(err)})
        })
    }
    
    handleUser = (user, index) => {
        // console.log(user);
        user.index = index;
        this.setState({switch_form: 2})
        setTimeout(()=>{this.setState({passdownUser: user})}, 3)
    }


    newUserForm = () => {
        this.changeClearform(true);
        this.setState({switch_form: 1});
    }

    removeUserFromList = (index) => {
        this.setState((preState)=>{
            preState.listOfUsers.splice(index, 1);
            return{listOfUsers: preState.listOfUsers}
        })
    }


    updateUserFromList = (user) => {
        this.setState((preState)=>{
            preState.listOfUsers[user.index] = user;
            return{listOfUsers: preState.listOfUsers}
        })
    }

    render(){
        return(
            <div>
                {this.state.user.admin?
                    <div className="banner">
                        <h2>Users Edit Page</h2>
                        <div className="users-container">
                            <div className="users">
                                <h4>Edit Users</h4>
                                <ul>
                                    {this.state.listOfUsers?
                                    this.state.listOfUsers.map((user, index) => {
                                        return(
                                            <>
                                                <li onClick={()=>this.handleUser(user, index)} key={index}> {user.username}  </li>
                                            </>
                                        )
                                    })
                                    :""}
                                </ul>
                                <button onClick={this.newUserForm}>New User</button>
                                <button onClick={this.changePass} >Change Password</button>
                            </div>
                            <div className="new-user-container">
                                    {
                                        this.state.switch_form == 1 ?
                                            <NewUserForm clear={this.state.clear_form} changeClearform={this.changeClearform} addUserToList={this.addUserToList} />:
                                        this.state.switch_form == 2 ?
                                            <UpdateUserForm user={this.state.passdownUser} removeUserFromList={this.removeUserFromList} newUserForm={this.newUserForm}
                                            updateUserFromList={this.updateUserFromList} />:
                                        this.state.switch_form == 3 ?
                                            <ChangePasswordForm passdownUser={this.state.user}/> : 
                                            ""    
                                    }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="banner">
                        <h2>Change Password Page</h2>
                        <ChangePasswordForm passdownUser={this.state.user} />
                        
                    </div>
                }                               
            </div>
        )
    }
}

export default ChangePassword;