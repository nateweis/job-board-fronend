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
                       controller_eta: data.data.controller_eta,
                       controller_po: data.data.controller_po,
                       controller_received: data.data.controller_received,
                       date_created: data.data.date_created,
                       due_date: data.data.due_date,
                       last_updated: data.data.last_updated,
                       notes: data.data.notes,
                       pump_eta: data.data.pump_eta,
                       pump_po: data.data.pump_po,
                       pump_received: data.data.pump_received,
                       shipdate_packlist: data.data.shipdate_packlist,
                       updated_by: data.data.updated_by,
                       stage: data.data.stage,
                       user: data.userInfo.name
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
                this.setState({makeUpdates: false})
            },(err) => {
                console.log(err);
                
            })
        })
        
    }  

    updateMenu = () => {
        this.setState({makeUpdates: true})
    }
    
    render(){
        return(
            <>
                {this.state.makeUpdates? <> {this.state.id? <div><form onSubmit={this.handleSubmit} >
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
                    <input type="submit" value="Update"/>
                </form></div> :<h3>Loading.......</h3>}</> : <div> <button onClick={this.updateMenu} >Make Updates</button> </div> }
                
            </>
        )
    }
}

export default BoosterShow