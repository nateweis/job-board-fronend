import React, { Component } from 'react';
import Auth from '../modules/Auth'



class BoosterShow extends Component{
    constructor(props){
        super(props)
        this.state={
            makeUpdates: false,
        }
    }

    componentDidMount(){
        this.pullBoosterData()
    }

    pullBoosterData = () => {
        fetch('http://localhost:3000/boosters/'+this.props.id,{method:'GET', headers:{Authorization : `Token ${Auth.getToken()}`}})
        .then((res) => {
           res.json()
           .then((data) => {
               console.log(data)
               if(data.err){this.props.push('/jobs/booster/index')}
               else{
                   this.setState({
                       id: data.data.id,
                       description: data.data.description,
                       job_address: data.data.job_address,
                       job_order_number: data.data.job_order_number,
                       requested_by: data.data.requested_by,
                       completed: data.data.completed,
                       controller_eta:this.formatDate(data.data.controller_eta) ,
                       controller_po: data.data.controller_po,
                       controller_received: data.data.controller_received,
                       date_created: this.formatDate(data.data.date_created),
                       due_date:this.formatDate(data.data.due_date) ,
                       last_updated:this.formatDate(data.data.last_updated),
                       notes: data.data.notes,
                       pump_eta: this.formatDate(data.data.pump_eta),
                       pump_po: data.data.pump_po,
                       pump_received: data.data.pump_received,
                       shipdate_packlist: data.data.shipdate_packlist,
                       updated_by: data.data.updated_by,
                       stage: data.data.stage,
                       user: data.userInfo.name,
                       originalData: data.data
                   })
               }
           },(err) => {
               console.log(err);
               
           }) 
        })
    }

    handleChange = (e) => {
        if(e.target.type === "radio"){           
            if(e.target.className === "trueClass"){this.setState({[e.target.name]: true})}
            else{this.setState({[e.target.name]: false})}
        }
        else{
            this.setState({[e.target.name]: e.target.value})
        }               
      }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/boosters',{
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : `Token ${Auth.getToken()}`
             }
        })
        .then((res) => {
            res.json()
            .then((data) => {
                console.log(data)
                this.pullBoosterData()
                this.setState({makeUpdates: false})
            },(err) => {
                console.log(err);
                
            })
        })
        
    }  

    formatDate =(string) => {
        const str = string;
        if(str){return str.slice(0,10)}
        return str
    }
    

    updateMenu = () => {
        this.setState({makeUpdates: true})
    }

    cancleChange = () => {
        this.setState({
            makeUpdates: false,
            description: this.state.originalData.description,
            job_address: this.state.originalData.job_address,
            job_order_number: this.state.originalData.job_order_number,
            requested_by: this.state.originalData.requested_by,
            completed: this.state.originalData.completed,
            controller_eta: this.state.originalData.controller_eta,
            controller_po: this.state.originalData.controller_po,
            controller_received: this.state.originalData.controller_received,
            notes: this.state.originalData.notes,
            pump_eta: this.state.originalData.pump_eta,
            pump_po: this.state.originalData.pump_po,
            pump_received: this.state.originalData.pump_received,
            shipdate_packlist: this.state.originalData.shipdate_packlist,
            due_date: this.state.originalData.due_date
        })
    }

    SpellOutDate = (props) => {
        let d = new Date(props.date)
        d= d.toDateString();
        
        return(<>{d}</>)
    }
    
    render(){
        return(
            <>
                {this.state.makeUpdates? <> {this.state.id? <div><button onClick={this.cancleChange}>X</button>
                    <form onSubmit={this.handleSubmit} >
                    Job Order Number: <input type="text" value={this.state.job_order_number} name="job_order_number" onChange={this.handleChange} />
                    <br/>
                    Description: <textarea name="description" cols="30" rows="1" onChange={this.handleChange} >{this.state.description}</textarea>
                    <br/>
                    Requested By: <input type="text" value={this.state.requested_by} onChange={this.handleChange} name="requested_by"/>
                    <br/>
                    Job Address: <input type="text" value={this.state.job_address} name="job_address" onChange={this.handleChange} />
                    <br/>
                    Pump PO: <input type="text" name="pump_po" value={this.state.pump_po} onChange={this.handleChange} />
                    <br/>
                    Pump ETA: <input type="date" name="pump_eta" value={this.state.pump_eta} onChange={this.handleChange} />
                    <br/>
                    Pump Received: Yes 
                    <input type="radio" name="pump_received" checked={this.state.pump_received} onChange={this.handleChange} className="trueClass"/> No 
                    <input type="radio" name="pump_received" checked={this.state.pump_received? false: true} onChange={this.handleChange}/>
                    <br/>
                    Controller PO: <input type="text" name="controller_po" value={this.state.controller_po} onChange={this.handleChange} />
                    <br/>
                    Controller ETA: <input type="date" name="controller_eta" value={this.state.controller_eta} onChange={this.handleChange} />
                    <br/>
                    Controller Received: Yes 
                    <input type="radio" name="controller_received" checked={this.state.controller_received} onChange={this.handleChange} className="trueClass" /> No 
                    <input type="radio" name="controller_received" checked={this.state.controller_received? false: true} onChange={this.handleChange}/>
                    <br/>
                    Due Date: <input type="date" name="due_date" value={this.state.due_date} onChange={this.handleChange} />
                    <br/>
                    Completed: Yes 
                    <input type="radio" name="completed" checked={this.state.completed} onChange={this.handleChange} className="trueClass" /> No 
                    <input type="radio" name="completed" checked={this.state.completed? false: true} onChange={this.handleChange}/>
                    <br/>
                    Shipdate/Packlist: <input type="text" name="shipdate_packlist" value={this.state.shipdate_packlist} onChange={this.handleChange} />
                    <br/>
                    Notes: <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange} />
                    <br/>
                    <input type="submit" value="Update"/>
                </form></div> :<h3>Loading.......</h3>}</> : <div> <button onClick={this.updateMenu} >Make Updates</button>
                    <ul>
                        <li>Job Order Number: {this.state.job_order_number} </li>
                        <li>Stage: {this.state.stage} </li>
                        <li>Last Updated: <this.SpellOutDate date={this.state.last_updated} /> </li>
                        <li>Updated By: {this.state.updated_by} </li>
                        <li>Date Created: <this.SpellOutDate date={this.state.date_created}/> </li>
                        <li>Description: {this.state.description} </li>
                        <li>Requested By: {this.state.requested_by} </li>
                        <li>Job Address: {this.state.job_address} </li>
                        <li>Pump PO: {this.state.pump_po} </li>
                        <li>Pump ETA: <this.SpellOutDate date={this.state.pump_eta}/> </li>
                        <li>Pump Received: {this.state.pump_received?'Yes':'No'} </li>
                        <li>Controller PO: {this.state.controller_po} </li>
                        <li>Controller ETA: <this.SpellOutDate date={this.state.controller_eta} /> </li>
                        <li>Controller Received: {this.state.controller_received?'Yes':'No'} </li>
                        <li>Due Date: <this.SpellOutDate date={this.state.due_date} /> </li>
                        <li>Completed: {this.state.completed?'Yes':'No'} </li>
                        <li>ShipDate/Packlist: {this.state.shipdate_packlist} </li>
                        <li>Notes: {this.state.notes} </li>
                    </ul>
                 </div> }
                
            </>
        )
    }
}

export default BoosterShow