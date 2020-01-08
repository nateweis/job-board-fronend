import React, { Component } from 'react';
import Auth from '../../modules/Auth'



class BoosterShow extends Component{
    constructor(props){
        super(props)
        this.state={
            makeUpdates: false,
        }
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
            stage: this.state.originalData.stage,
            pump_eta: this.state.originalData.pump_eta,
            pump_po: this.state.originalData.pump_po,
            pump_received: this.state.originalData.pump_received,
            shipdate_packlist: this.state.originalData.shipdate_packlist,
            due_date: this.state.originalData.due_date,
            carrier: this.state.originalData.carrier,
            bol_number: this.state.originalData.bol_number,
            pro_number: this.state.originalData.pro_number,
            deposit_amount: this.state.originalData.deposit_amount,
            invoice_number: this.state.originalData.invoice_number
        })
    }

    changeCompletion = (bol) => {
        const obj = {completed: bol, id: this.state.id}
        fetch('https://job-board-api.herokuapp.com/boosters/completed',{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization : `Token ${Auth.getToken()}`
        },
            body: JSON.stringify(obj)
        })
        .then((res) => {
            res.json()
            .then((data) => {
                // console.log(data)
                this.props.push('/jobs/booster/index')
            },(err) => {
                console.log(err);
                
            })
        })
    }

    componentDidMount(){
        this.pullBoosterData()
    }

    deleteJob = () => {
        fetch('https://job-board-api.herokuapp.com/boosters/'+this.props.id,{
            method:'DELETE',
            headers:{Authorization : `Token ${Auth.getToken()}`}
        })
        .then((res) => {
            res.json()
            .then((data) => {
                // console.log(data)
                this.props.push('/jobs/booster/index')
            },(err) => {
                console.log(err);
                
            })
        })
    }

    // formatDate =(string) => {
    //     const str = string;
    //     if(str){return str.slice(0,10)}
    //     return str
    // }

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
        // console.log(this.state)
        e.preventDefault()
        setTimeout(this.updateApi, 500)
               
    }

    pullBoosterData = () => {
        fetch('https://job-board-api.herokuapp.com/boosters/'+this.props.id,{method:'GET', headers:{Authorization : `Token ${Auth.getToken()}`}})
        .then((res) => {
           res.json()
           .then((data) => {
               console.log(data)
               if(data.err){this.props.push('/jobs/booster/index')}
               else if(data.message === "403 forbiddin"){this.props.push('/jobs/booster/index')}
               else{
                   this.setState({
                       id: data.data.id,
                       description: data.data.description,
                       job_address: data.data.job_address,
                       job_order_number: data.data.job_order_number,
                       requested_by: data.data.requested_by,
                       completed: data.data.completed,
                       controller_eta:data.data.controller_eta,
                       controller_po: data.data.controller_po,
                       controller_received: data.data.controller_received,
                       date_created: data.data.date_created,
                       due_date:data.data.due_date,
                       last_updated:data.data.last_updated,
                       notes: data.data.notes,
                       pump_eta: data.data.pump_eta,
                       pump_po: data.data.pump_po,
                       pump_received: data.data.pump_received,
                       shipdate_packlist: data.data.shipdate_packlist,
                       updated_by: data.data.updated_by,
                       stage: data.data.stage,
                       user: data.userInfo.name,
                       carrier: data.data.carrier,
                       bol_number: data.data.bol_number,
                       pro_number: data.data.pro_number,
                       deposit_amount: data.data.deposit_amount,
                       invoice_number: data.data.invoice_number,
                       originalData: data.data
                   })
               }
           },(err) => {
               console.log(err);
               
           }) 
        })
    }


    
    updateApi = () => {
        fetch('https://job-board-api.herokuapp.com/boosters',{
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
                // console.log(data)
                this.pullBoosterData()
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
                {this.state.makeUpdates? <> {this.state.id? <div>
                    <h3 className="banner">Update Form</h3>
                    <form onSubmit={this.handleSubmit} className="form-style" >
                    
                    <span>
                        <button className="cancle-btn" onClick={this.cancleChange}>X</button>
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
                            <option value={this.state.stage}>Current Stage {this.state.stage}</option>
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
                        <input type="submit" value="Update"/>
                    </span>
                </form></div> :<h3>Loading.......</h3>}</> : <div>
                    <div className="banner">
                        <h2>Booster Job Info</h2>
                        <>
                            {this.state.completed?
                            <span className="flexbox">
                                <button onClick={()=> this.changeCompletion(false)}>Un-Archive</button>
                            </span>
                            :
                            <span className="flexbox">
                                <button onClick={this.updateMenu} >Make Updates</button>
                                <button onClick={()=> this.changeCompletion(true)} >Archive Job</button>
                                <button onClick={this.deleteJob}>Delete Job from JobBoard</button>
                            </span>
                            }
                        </>
                    </div> 
                    <div className="show-display">
                        <ul>
                            <li> <strong>Job Order Number:</strong>  {this.state.job_order_number} </li>
                            <li className={this.state.completed? "stage-class5": "stage-class"+ this.state.stage} ><strong>Stage:</strong> {this.state.completed? "5": this.state.stage} </li>
                            <li> <strong>Last Updated:</strong><this.props.SpellOutDate date={this.state.last_updated} /> </li>
                            <li><strong>Updated By:</strong> {this.state.updated_by} </li>
                            <li><strong>Date Created:</strong> <this.props.SpellOutDate date={this.state.date_created}/> </li>
                            <li><strong>Description:</strong> {this.state.description} </li>
                            <li><strong>Customer:</strong> {this.state.requested_by} </li>
                            <li><strong>Job Address:</strong> {this.state.job_address} </li>
                            <li><strong>Pump PO:</strong> {this.state.pump_po} </li>
                            <li><strong>Pump ETA:</strong> <this.props.SpellOutDate date={this.state.pump_eta}/> </li>
                            <li><strong>Pump Received:</strong> {this.state.pump_received?'Yes':'No'} </li>
                            <li> <strong>Controller PO:</strong> {this.state.controller_po} </li>
                            <li> <strong>Controller ETA:</strong> <this.props.SpellOutDate date={this.state.controller_eta} /> </li>
                            <li> <strong>Controller Received:</strong> {this.state.controller_received?'Yes':'No'} </li>
                            <li> <strong>Due Date:</strong> <this.props.SpellOutDate date={this.state.due_date} /> </li>
                            <li> <strong>Completed:</strong> {this.state.completed?'Yes':'No'} </li>
                            <li> <strong>ShipDate/Packlist:</strong> {this.state.shipdate_packlist} </li>
                            <li> <strong>Deposite Amount:</strong> {this.state.deposit_amount} </li>
                            <li> <strong>Invoice Number:</strong> {this.state.invoice_number} </li>
                            <li><strong>Carrier: </strong>  {this.state.carrier}</li>
                            <li><strong>Bol Number:  </strong>{this.state.bol_number} </li>
                            <li><strong>Pro Number:  </strong>{this.state.pro_number} </li>
                            <li> <strong>Notes:</strong> {this.state.notes} </li>
                        </ul>
                    </div>
                 </div> }
                
            </>
        )
    }
}

export default BoosterShow