import React, {Component} from 'react';
import Auth from '../modules/Auth'

class BoosterHome extends Component{
    constructor(props) {
       super(props)
       this.state = {

       } 
    }

    componentDidMount(){
        fetch('http://localhost:3000/boosters',{
            method:"GET",
            headers:{
                Authorization : `Token ${Auth.getToken()}`
            }
        })
        .then((res) => {
            res.json()
            .then((data) => {
               console.log(data);
                this.setState({jobs:data.data})
            },(err) => {
                console.log(err);
                
            }
            
            )
        })
    }

    render(){
        return(
            <div>
            <h2>Booster Jobs Index Page</h2>
            {this.state.jobs? this.state.jobs.map((job, index) => {
                return(
                    <div key={index}>
                        <p>Job Order Number: {job.job_order_number}</p>
                        <p>Requested By: {job.requested_by} </p>
                        <p>Site Location: {job.job_address} </p>
                        <p>Job Description: {job.description} </p>
                        <p>=====================================</p>
                    </div>
                )
            }) : <h4>Loading.....</h4> }
            </div>
        )
    }
}

export default BoosterHome