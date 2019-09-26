import React, {Component} from 'react';
import Auth from '../modules/Auth'

class BoosterHome extends Component{
    constructor(props) {
       super(props)
       this.state = {
            filter: 'stage'
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

    filterOptions = (e) => {
        console.log(e.target.value)
        this.setState({filter: e.target.value})
    }

    showPage = (job) => {
        this.props.history.push("/jobs/booster/"+job)
    }

    newJobPage = () => {
        this.props.history.push("/jobs/booster/new",{user:this.state.user})
    }

    render(){

        const jobList =  this.state.jobs? this.state.jobs.sort((a,b)=>a[this.state.filter] - b[this.state.filter]).map((job, index) => {
            return(
                <div key={index} className="index-display" onClick={()=>this.showPage(job.id)}>
                    <p>Job Order Number: {job.job_order_number}</p>
                    <p>Stage: {job.stage}</p>
                    <p>Requested By: {job.requested_by} </p>
                    <p>Site Location: {job.job_address} </p>
                    <p>Job Description: {job.description} </p>
                    <p>=====================================</p>
                </div>
            )
        }) : <h4>Loading.....</h4>
        
        return(
            <div>
                <div className="banner">
                    <h2>Booster Jobs Index Page</h2>
                    <span className="flexbox">
                        <select name="filter" onChange={this.filterOptions}>
                            <option value="stage">Sort Options</option>
                            <option value="stage">Stage</option>
                            <option value="job_order_number">Job Order Number</option>
                        </select>
                        <button onClick={this.newJobPage}>Add a New Job</button>
                    </span>
                </div>
            
            <div className="index-holder">{ jobList}</div>
            </div>
        )
    }
}

export default BoosterHome