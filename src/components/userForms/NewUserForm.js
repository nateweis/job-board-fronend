import React, { Component } from 'react';
import Auth from '../../modules/Auth'

class NewUserForm extends Component{

    render(){
        return(
            <>
            <form>
                <input type="text" name="" />
                <input type="password" name=""/>
                <input type="text"/>
                <input type="checkbox" name="" />
                <input type="submit" value="Submit"/>
            </form>
            </>
        )
    }
}

export default NewUserForm;