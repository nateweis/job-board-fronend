import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Auth from '../../modules/Auth'



class TankfillNew extends Component{
    constructor(props) {
        super(props)
        this.state = {
            job_order_number:"",
            description:"",
            requested_by:"",
            job_address:"",
            stage:1,
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
            notes:"",
            carrier:"",
            bol_number:"",
            pro_number:"",
            deposit_amount:"",
            invoice_number:""
        }
    }

    cancle= () => {
        this.resetState()
        this.props.history.push('/jobs/tankfill/index')
    }

    checkForUser = () => {
        if(!this.props.location.state){
            this.props.history.push('/jobs/tankfill/index')
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
        setTimeout(this.postToApi, 500)
    } 

    resetState = () => {
        this.setState({
            job_order_number:"",
            description:"",
            requested_by:"",
            job_address:"",
            stage:1,
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
            notes:"",
            carrier:"",
            bol_number:"",
            pro_number:"",
            deposit_amount:"",
            invoice_number:""
        })
    }


   postToApi = () => {
    fetch('https://job-board-api.herokuapp.com/tankfill',{
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
            // console.log(data)
            this.resetState()
            this.props.history.push('/jobs/tankfill/index')
        },(err) => {
            console.log(err)
        })
    })
   }
    
    

    render(){
        return(
            <div>
                <h3 className="banner">New Tankfill Job</h3>
                <form onSubmit={this.handleSubmit} className="form-style" >
                    <span>
                        <button className="cancle-btn" onClick={this.cancle} >Cancle</button>
                    </span>
                
                    <span>
                        <label htmlFor="">Job Order Number: </label>
                        <input type="text" value={this.state.job_order_number} name="job_order_number" onChange={this.handleChange} />
                    </span>
                    
                    <span>
                        <label htmlFor="">Description:</label>
                         <textarea name="description" cols="54" rows="2" onChange={this.handleChange} >{this.state.description}</textarea>
                    </span>

                    <span>
                        <label htmlFor="">Customer: </label>
                        <input type="text" value={this.state.requested_by} onChange={this.handleChange} name="requested_by"/>
                    </span>

                    <span>
                        <label htmlFor="">Job Address: </label>
                        <input type="text" value={this.state.job_address} name="job_address" onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Stage:   </label>
                        <select name="stage" onChange={this.handleChange} >
                        <option value="1">1 Ready for Pick Release</option>
                            <option value="2">2 Ready for Pick Confirm </option>
                            <option value="3">3 Ready for Ship Confirm</option>
                            <option value="4">4 Ready for Invoicing</option>
                            <option value="5">5 Completed</option>
                        </select>
                    </span>

                    <span>
                        <label htmlFor="">Pump PO: </label>
                        <input type="text" name="pump_po" value={this.state.pump_po} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Pump ETA: </label>
                        <input type="date" name="pump_eta" value={this.state.pump_eta} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Pump Received: </label> 
                        Yes  <input type="radio" name="pump_received" checked={this.state.pump_received} onChange={this.handleChange} className="trueClass"/> No   
                        <input type="radio" name="pump_received" checked={this.state.pump_received? false: true} onChange={this.handleChange}/>
                    </span>
                    
                    <span>
                        <label htmlFor="">Controller PO: </label>    
                        <input type="text" name="controller_po" value={this.state.controller_po} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Controller ETA: </label>    
                        <input type="date" name="controller_eta" value={this.state.controller_eta} onChange={this.handleChange} />
                    </span>

                    <span>                   
                        <label >Controller Received: </label> 
                        Yes  <input type="radio" name="controller_received" checked={this.state.controller_received} onChange={this.handleChange} className="trueClass" /> No 
                        <input type="radio" name="controller_received" checked={this.state.controller_received? false: true} onChange={this.handleChange}/>
                    </span>
                    
                    <span>
                        <label >Due Date: </label>
                        <input type="date" name="due_date" value={this.state.due_date} onChange={this.handleChange} />
                    </span>

                    {/* <span>
                        <label>Completed: </label>  
                        Yes  <input type="radio" name="completed" checked={this.state.completed} onChange={this.handleChange} className="trueClass" /> No   
                        <input type="radio" name="completed" checked={this.state.completed? false: true} onChange={this.handleChange}/>
                    </span> */}
                    
                    <span>
                        <label >Shipdate/Packlist:</label>
                        <input type="text" name="shipdate_packlist" value={this.state.shipdate_packlist} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Deposite Amount:</label>
                        <input type="text" name="deposit_amount" value={this.state.deposit_amount} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Invoice Number:</label>
                        <input type="text" name="invoice_number" value={this.state.invoice_number} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Carrier:  </label>
                        <input type="text" name="carrier" value={this.state.carrier} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Bol Number: </label>
                        <input type="text" name="bol_number" value={this.state.bol_number} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label htmlFor="">Pro Number: </label>
                        <input type="text" name="pro_number" value={this.state.pro_number} onChange={this.handleChange} />
                    </span>

                    <span>
                        <label>Notes:</label>                    
                        <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange} />
                    </span>

                    <span>
                        <input type="submit" value="Add Job"/>
                    </span>
                </form>
            </div>
        )
    }
}

export default withRouter(TankfillNew) 