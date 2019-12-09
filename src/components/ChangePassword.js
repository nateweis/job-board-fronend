import React, { Component } from 'react';

class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: this.props.passdownUser
        }
    }

    componentDidMount(){
        this.setState({submitSuccess: false})
    }

    componentDidUpdate(){
        if(this.state.user.name !== this.props.passdownUser.name){
            this.setState({user:this.props.passdownUser})
        }
    }

    handleSubmitPassword =(e) => {
        e.preventDefault();
        this.setState({submitSuccess: true})
    }

    render(){
        return(
            <div>
                {this.state.user.admin?
                    <div className="banner">
                        <h2>Users Edit Page</h2>
                    </div>
                    :
                    <div className="banner">
                        <h2>Change Password Page</h2>
                        {this.state.submitSuccess?
                            <form className="form-style"><h2>Success, your password has been changed</h2></form>
                            :
                            <form className="form-style" onSubmit={this.handleSubmitPassword}>

                                <span>
                                    <label htmlFor="">Current Password:  </label>
                                    <input type="password"/>
                                </span>

                                <span>
                                    <label htmlFor="">New Password:  </label>
                                    <input type="password"/>
                                </span>

                                <span>
                                    <label htmlFor="">Retype New Password: </label>
                                    <input type="password"/>
                                </span>

                                <span>
                                    <input type="submit" value="Submit"/>
                                </span>
                            </form>
                        }
                        
                    </div>
                }                               
            </div>
        )
    }
}

export default ChangePassword;