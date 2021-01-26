import React, { Component } from 'react';

class InStock extends Component{
    constructor(props){
        super(props)
        this.state= {
            
        }
    }

    render(){

        return(
            <>
                <div className="banner">
                    <h2>Stock</h2>
                </div>
                
                <div className="flexbox">
                    <input type="text" placeholder="Add Item" name="" id=""/>
                    <button>Add</button>
                </div>

                <div className="show-display">
                    <ul>
                        <li>Example <button>Edit</button>  <button>Delete</button></li>
                        <li>Example <button>Edit</button>  <button>Delete</button></li>
                        <li>Example <button>Edit</button>  <button>Delete</button></li>
                        <li>Example <button>Edit</button>  <button>Delete</button></li>
                        <li>Example <button>Edit</button>  <button>Delete</button></li>
                        <li>Example <button>Edit</button>  <button>Delete</button></li>
                    </ul>
                </div>
            </>
        )
    }
}

export default InStock