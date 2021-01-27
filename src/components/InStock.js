import React, { Component } from 'react';

class InStock extends Component{
    constructor(props){
        super(props)
        this.state= {
            items: [],
            addItem : " "
        }
    }

    changeEdit = (index) => {
        const bool = this.state.items[index].edit
        this.setState((pre) => {
            pre.items[index].edit = !bool
            return{items : pre.items}
        })
    }

    deleteItem = (index) => {
       let newArr = this.state.items
       newArr.splice(index, 1)
       this.setState({items: newArr})
    }

    editItem = (index) => {
        console.log(this.state.items[index])
        console.log(index)
        this.changeEdit(index)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:[e.target.value]})
    }

    handelEdit = (e) => {
        const i = parseInt([e.target.name])
        const val = [e.target.value]
        this.setState((pre) => {
            pre.items[i].name = val
            return{items : pre.items}
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newItem = {}
        newItem.name = this.state.addItem;
        newItem.edit = false;

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
                                    <li style={style.inputBtns} > 
                                    <span style={style.label}>
                                        {
                                        item.edit?
                                        <input type="text" value={item.name} name={index} onChange={this.handelEdit}/> 
                                          :
                                        item.name
                                        }
                                    </span>

                                    <span>
                                        {item.edit? 
                                        <button onClick={()=> this.editItem(index)}>Submit</button> 
                                            :
                                        <button onClick={()=> this.changeEdit(index)}>Edit</button>
                                        }  

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