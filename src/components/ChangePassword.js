import React, { Component } from 'react';

class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: this.props.passdownUser
        }
    }

    componentDidUpdate(){
        if(this.state.user.name !== this.props.passdownUser.name){
            this.setState({user:this.props.passdownUser})
        }
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
                        <form className="form-style">
                            <span>
                                <label htmlFor="">Current Password:  </label>
                                <input type="text"/>
                            </span>
                        </form>
                    </div>
                }                               
            </div>
        )
    }
}

export default ChangePassword;