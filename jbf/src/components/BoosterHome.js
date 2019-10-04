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
            if(this.props.archive){
                return(
                    <>
                    {job.completed? 
                        <div key={index} className="index-display" onClick={()=>this.showPage(job.id)}>
                        <p> <strong>Job Order Number:  </strong> {job.job_order_number}</p>
                        <p className="stage-class"> <strong>Stage:  </strong> {job.stage}</p>
                        <p> <strong>Customer:  </strong> {job.requested_by} </p>
                        <p><strong>Site Location:   </strong> {job.job_address} </p>
                        <p><strong>Job Description:   </strong> {job.description} </p>
                        <p>=====================================</p>
                    </div> :""
                    }
                    </>
                )
            }
            return(
                <>
                {job.completed? "" : 
                    <div key={index} className="index-display" onClick={()=>this.showPage(job.id)}>
                    <p> <strong>Job Order Number:  </strong> {job.job_order_number}</p>
                    <p className="stage-class"> <strong>Stage:  </strong> {job.stage}</p>
                    <p> <strong>Customer:  </strong> {job.requested_by} </p>
                    <p><strong>Site Location:   </strong> {job.job_address} </p>
                    <p><strong>Job Description:   </strong> {job.description} </p>
                    <p>=====================================</p>
                </div>
                }
                </>
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