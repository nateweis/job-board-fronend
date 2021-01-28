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

    componentDidMount(){
        fetch('http://localhost:3001/stock',{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : `Token ${Auth.getToken()}`
             }
        })
        .then((res) => {
            res.json()
            .then(data => this.setState({items: data.data}))
            .catch(err => console.log(err))
        })
    }

    changeEdit = (index) => {
        const bool = this.state.items[index].edit
        this.setState((pre) => {
            pre.items[index].edit = !bool
            return{items : pre.items}
        })
    }

    deleteItem = (index) => {
        fetch('http://localhost:3001/stock/' + this.state.items[index].id,{
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : `Token ${Auth.getToken()}`
             }
        })
        .then((res) => {
            res.json()
            .then(data => console.log(data))
            .catch(err => console.log(err))
        })

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
            pre.items[i].name = val[0]
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
        newItem.name = this.state.addItem[0];
        newItem.edit = false;
        newItem.id = id;
        newItem.user = this.props.passdownUser.name
        console.log(newItem.name)

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
                // console.log(data)
                this.setState({items: [newItem, ...this.state.items], addItem: " "})
            })
            .catch(err => console.log(err))
        })


    }

    submitEditItem = (index) => {
        this.changeEdit(index)
        const updateItem = this.state.items[index]
        updateItem.user = this.props.passdownUser.name
        console.log(updateItem)
        fetch('http://localhost:3001/stock',{
            method: 'PUT',
            body: JSON.stringify(updateItem),
            headers:{
                'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : `Token ${Auth.getToken()}`
             }
        })
        .then((res) => {
            res.json()
            .then(data =>{console.log(data)})
            .catch(err => console.log(err))
        })
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