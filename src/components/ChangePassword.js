import React, { Component } from 'react';
import Auth from '../modules/Auth'
import NewUserForm from './userForms/NewUserForm'
import UpdateUserForm from './userForms/UpdateUserForm'

class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.inputRef = React.createRef();
        this.state = {
            user: this.props.passdownUser,
            old_pass: "",
            new_pass: "",
            re_new_pass: "",
            pass_match: false,
            wrong_pass: false
        }
    }

    componentDidMount(){
        this.setState({submitSuccess: false});
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

    checkPassMatch = () => {
        if(this.state.new_pass === this.state.re_new_pass){
            this.setState({pass_match:false, wrong_pass:false});
            this.updatedPassword()          
        }else{
            this.setState({pass_match:true});
        }
        
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

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmitPassword =(e) => {
        e.preventDefault();
        this.unclickEye();
        this.checkPassMatch();
        this.resetState();
    }

    handleUser = (user) => {
        // console.log(user);
        this.setState({passdownUser: user})
    }

    iconClick =(e) => {
        const $form = this.inputRef.current.children
        for (let i = 0; i< $form.length; i++) {
             if($form[i].children[2] && $form[i].children[2].id === e.target.id){
                 if($form[i].children[1].type === "password"){$form[i].children[1].type = "text"}
                 else{$form[i].children[1].type = "password"}
             }
        }
    }

    resetState = () => {
        this.setState({
            old_pass: "",
            new_pass: "",
            re_new_pass: ""
        })
    }

    unclickEye = () => {
        const $form = this.inputRef.current.children;
        for (let i = 0; i < $form.length; i++) {
            if($form[i].children[2] && $form[i].children[1].type === "text"){
                $form[i].children[1].type = "password";
            }
        }
    }

    updatedPassword = () => {
        fetch('https://job-board-api.herokuapp.com/users',{
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
                if(data.message === "check it out, it worked"){
                    this.setState({submitSuccess: true});
                }else{
                    this.setState({wrong_pass: true})
                }
            },(err) => {
                console.log(err);
                
            })
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
                                <h4>Users</h4>
                                <ul>
                                    {this.state.listOfUsers?
                                    this.state.listOfUsers.map((user, index) => {
                                        return(
                                            <>
                                                <li onClick={()=>this.handleUser(user)} key={index}> {user.username}  </li>
                                            </>
                                        )
                                    })
                                    :""}
                                </ul>
                                <button>New User</button>
                            </div>
                            <div className="new-user-container">
                                    <NewUserForm /><UpdateUserForm user={this.state.passdownUser} />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="banner">
                        <h2>Change Password Page</h2>
                        {this.state.submitSuccess?
                            <form className="form-style"><h2>Success, your password has been changed</h2></form>
                            :
                            <>
                            <form className="form-style" onSubmit={this.handleSubmitPassword} ref={this.inputRef}>

                                <span>
                                    <label htmlFor="">Current Password:  </label>
                                    <input type="password" name="old_pass" value={this.state.old_pass} onChange={this.handleChange}/>
                                    <i className="fas fa-eye" onClick={this.iconClick} id="1" ></i>
                                </span>

                                <span>
                                    <label htmlFor="">New Password:  </label>
                                    <input type="password" name="new_pass" value={this.state.new_pass} onChange={this.handleChange}/>
                                    <i className="fas fa-eye" onClick={this.iconClick} id="2" ></i>
                                </span>

                                <span>
                                    <label htmlFor="">Retype New Password: </label>
                                    <input type="password" name="re_new_pass" value={this.state.re_new_pass} onChange={this.handleChange}/>
                                    <i className="fas fa-eye" onClick={this.iconClick} id="3" ></i>
                                </span>

                                <span>
                                    <input type="submit" value="Submit"/>
                                </span>
                            </form>

                            <h4 className="wrong-login">{this.state.pass_match? "Confirmation Password Doesn't Match":""}</h4>
                            <h4 className="wrong-login">{this.state.wrong_pass?"Wrong Credentials, Please Give the Proper Password for this Account":""}</h4>
                            </>
                        }
                        
                    </div>
                }                               
            </div>
        )
    }
}

export default ChangePassword;