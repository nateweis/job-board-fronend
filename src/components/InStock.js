import React, { Component } from 'react';
import Auth from '../modules/Auth'

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
        e.preventDefault();

        let id;
        if(this.state.items[0]){
            let temp = 0 
            this.state.items.forEach(item => {
               if(item.id > temp) temp = item.id
            });
            id = temp + 1
        }else{
            id = 1
        }

        const newItem = {}
        newItem.name = this.state.addItem;
        newItem.edit = false;
        newItem.id = id;
        newItem.user = this.props.passdownUser.name

        fetch('http://localhost:3001/stock',{
            method: 'POST',
            body: JSON.stringify(newItem),
            headers:{
                'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : `Token ${Auth.getToken()}`
             }
        })
        .then((res) => {
            res.json()
            .then(data =>{
                console.log(data)
                this.setState({items: [newItem, ...this.state.items], addItem: " "})
            })
            .catch(err => console.log(err))
        })


    }

    submitEditItem = (index) => {
        console.log(this.state.items[index])
        console.log(index)
        this.changeEdit(index)
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
                                        <button onClick={()=> this.submitEditItem(index)}>Submit</button> 
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