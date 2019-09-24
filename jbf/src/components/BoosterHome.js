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
                this.setState({jobs:data.data, user:data.userInfo.name})
            },(err) => {
                console.log(err);
                
            }
            
            )
        })
    }

    showPage = (job) => {
        this.props.history.push("/jobs/booster/"+job)
    }

    newJobPage = () => {
        this.props.history.push("/jobs/booster/new",{user:this.state.user})
    }

    render(){
        return(
            <div>
            <h2>Booster Jobs Index Page</h2>
            <button onClick={this.newJobPage}>Add a New Job</button>
            {this.state.jobs? this.state.jobs.map((job, index) => {
                return(
                    <div key={index} onClick={()=>this.showPage(job.id)}>
                        <p>Job Order Number: {job.job_order_number}</p>
                        <p>Stage: {job.stage}</p>
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