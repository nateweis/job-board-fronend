import React, { Component } from 'react';

class InStock extends Component{
    constructor(props){
        super(props)
        this.state= {
            items: [],
            addItem : " "
        }
    }

    deleteItem = (index) => {
        console.log(this.state.items[index])
    }

    editItem = (index) => {
        console.log(this.state.items[index])
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:[e.target.value]})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newItem = this.state.addItem
        this.setState({items: [newItem, ...this.state.items], addItem: " "})
    }

    render(){

        return(
            <>
                <div className="banner">
                    <h2>Stock</h2>
                </div>
                
                
                <form onSubmit={this.handleSubmit} className="flexbox">
                    <label style={style.label}>Add Item:</label>
                    <input type="text" style={style.input} name="addItem" value={this.state.addItem} onChange={this.handleChange}/>
                    <button>Add</button>
                </form>
                

                <div className="show-display">
                    <ul>
 
                        {this.state.items? this.state.items.map((item, index) => {
                            return(
                                <span key={index}>
                                    <li key={index} style={style.inputBtns} > <span style={style.label}>{item}</span>

                                    <span>
                                        <button onClick={()=> this.editItem(index)}>Edit</button>  
                                        <button onClick={()=> this.deleteItem(index)}>Delete</button>
                                    </span>
 
                                    </li>
                                </span>
                            )
                        }) : "Loading................"}


                    </ul>
                </div>
            </>
        )
    }
}

const style = {
    input: {
        width: "300px"
    },
    label: {
        paddingTop: "10px",
        fontSize: "19px"
    },
    inputBtns: {
        display: "flex",
        justifyContent: "space-between"
    }
}

export default InStock