import React, { Component } from 'react';
import Auth from '../modules/Auth'

class InStock extends Component{
    constructor(props){
        super(props)
        this.state= {
            items: [],
            addItem : "",
            latestUser : "Unknown",
            latestDate :  "1/1/2000",
            catigory: "booster",
            catigoryDisplay: "allStock"
        }
    }

    componentDidMount(){
        if (this.props.passdownUser.name === 'Unknown') this.props.push("/jobs/booster/index")

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
            .then(data => {
                const newest = data.data[0]//for getting newest latest update information 
                newest.update_date = this.formatDate(newest.update_date)

                let itemsList = data.data // for sorting the items in alphebetical order 
                itemsList.sort(this.sortObject)

                this.setState({items: itemsList, latestUser : newest.update_by, latestDate : newest.update_date})

                
            })
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

    changeFilter = (str, e) => {
        this.setState({catigoryDisplay: str})

        const childrenBtns = e.target.parentElement.childNodes
        childrenBtns.forEach(btn => {
            btn.classList.remove("active")
        });

        e.target.classList.add("active")
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

    formatDate = (dt) => {
        const dtSplit = dt.split('T')
        const date = dtSplit[0].split('-')
        return `${parseInt(date[1])}/${parseInt(date[2])}/${date[0]}`
    }


    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
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
        newItem.name = this.state.addItem;
        newItem.edit = false;
        newItem.id = id;
        newItem.user = this.props.passdownUser.name
        newItem.catigory = this.state.catigory
        // console.log(newItem)

        if(newItem.name) {
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
        else alert("Add Item Field Not Filled In")


    }

    sortObject = (a, b) => {
        const itemA = a.name.toUpperCase();
        const itemB = b.name.toUpperCase();
 
        let compare = 0;
        if(itemA > itemB) compare = 1
        else if (itemA < itemB) compare = -1
 
        return compare
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

        let filteredItems = this.state.items? this.state.items.filter((it) => {
            if(this.state.catigoryDisplay !== "allStock"){
                return it.catigory.toLowerCase().indexOf(this.state.catigoryDisplay.toLowerCase()) !== -1 
            }else return it
            

        }): null

        return(
            <>
                <div className="banner">
                    <h2>Stock</h2>
                </div>
                
                
                <form onSubmit={this.handleSubmit} className="flexbox">
                    <label style={style.label}>Add Item:</label>
                    <span>
                        <input type="text" style={style.input} name="addItem" value={this.state.addItem} onChange={this.handleChange}/>
                        <select name="catigory" style={style.select} onChange={this.handleChange}>
                            <option value="booster">Booster</option>
                            <option value="sewer">Sewer</option>
                            <option value="tank">Tank</option>
                        </select>
                    </span>

                    <button>Add</button>
                </form>
                
                <div style={style.btnContainer}>
                    <span style={style.allNavBtns}>
                        <button style={style.navBtns} className="active" onClick={(e)=>this.changeFilter("allStock", e)}>All</button>
                        <button style={style.navBtns} onClick={(e)=>this.changeFilter("booster", e)}>Booster</button>
                        <button style={style.navBtns} onClick={(e)=>this.changeFilter("sewer",e)}>Sewer</button>
                        <button style={style.navBtns} onClick={(e)=>this.changeFilter("tank",e)}>Tank</button>
                    </span>

                    <p style={style.p}><span style={style.pSpan}>Last Updated On: </span> {this.state.latestDate}  <span style={style.pSpan}>By:</span> {this.state.latestUser} </p>
                </div>


                <div className="show-display">
                    <ul>
 
                        {filteredItems? filteredItems.map((item, index) => {
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
        width: "300px",
        height:"30px",
        marginRight: "0"
    },
    select: {
        marginLeft: "0",
        height: "35px",
        fontFamily: 'Raleway'
    },
    label: {
        paddingTop: "10px",
        fontSize: "19px"
    },
    inputBtns: {
        display: "flex",
        justifyContent: "space-between"
    },
    p:{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        marginBottom: "-10px"
    },
    pSpan:{
        paddingLeft: "50px",
        paddingRight: "3px",
        fontWeight: 800,
        color: "#420000"
    },
    btnContainer:{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px"
    },
    allNavBtns: {
        marginBottom: "-20px"
    },
    navBtns:{
        marginTop: "7px"
    }
}

export default InStock