import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Auth from '../modules/Auth'



class BoosterNew extends Component{
    constructor(props) {
        super(props)
        this.state = {
            job_order_number:"",
            description:"",
            requested_by:"",
            job_address:"",
            stage:0,
            pump_po:"",
            pump_eta:null,
            pump_received:false,
            updated_by: "",
            controller_po:"",
            controller_eta:null,
            controller_received:false,
            due_date:null,
            completed:false,
            shipdate_packlist:"",
            notes:""
        }
    }

    cancle= () => {
        this.resetState()
        this.props.history.push('/jobs/booster/index')
    }

    checkForUser = () => {
        if(!this.props.location.state){
            this.props.history.push('/jobs/booster/index')
        }else{
            this.setState({updated_by: this.props.location.state.user})
        }
    }

    componentDidMount(){
        this.checkForUser()
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
            method: 'POST',
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
                this.resetState()
                this.props.history.push('/jobs/booster/index')
            },(err) => {
                console.log(err)
            })
        })
    } 

    resetState = () => {
        this.setState({
            job_order_number:"",
            description:"",
            requested_by:"",
            job_address:"",
            stage:0,
            pump_po:"",
            pump_eta:null,
            pump_received:false,
            updated_by: this.props.location.state.user,
            controller_po:"",
            controller_eta:null,
            controller_received:false,
            due_date:null,
            completed:false,
            shipdate_packlist:"",
            notes:""
        })
    }

   
    
    

    render(){
        return(
            <div>
                <h3>New Page</h3>
                <button onClick={this.cancle} >X</button>
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
                </form>
            </div>
        )
    }
}

export default withRouter(BoosterNew) 