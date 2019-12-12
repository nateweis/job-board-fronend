import React, { Component } from 'react';
import Auth from '../../modules/Auth'

class NewUserForm extends Component{

    render(){
        return(
            <>
            <form className="form-style">
                <h3>Add a New User</h3>

                <span>
                    <input type="text" name="" />
                </span>
                
                <span>
                    <input type="password" name=""/>
                </span>

                <span>
                    <input type="text"/>
                </span>

                <span>
                    <input type="checkbox" name="" />
                </span>
                
                <input type="submit" value="Submit"/>
            </form>
            </>
        )
    }
}

export default NewUserForm;