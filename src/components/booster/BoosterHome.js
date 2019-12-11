import React, {Component} from 'react';
import Auth from '../../modules/Auth'

class BoosterHome extends Component{
    constructor(props) {
       super(props)
       this.state = {
            filter: 'stage',
            search:""
       } 
    }

    componentDidMount(){
        fetch('https://job-board-api.herokuapp.com/boosters',{
            method:"GET",
            headers:{
                Authorization : `Token ${Auth.getToken()}`
            }
        })
        .then((res) => {
            res.json()
            .then((data) => {
            //    console.log(data);
               if(data.message === "403 forbiddin"){
                Auth.deauthUser();
                this.props.history.push("/login")
               }
               else{
                   const obj = {
                       name: data.userInfo.name,
                       admin: data.userInfo.admin,
                       id: data.userInfo.id
                   }
                   this.setState({jobs:data.data, user:data.userInfo.name})
                   this.props.retriveUser(obj)                   
               }
            },(err) => {
                console.log(err);
                
            }
            
            )
        })
    }

    filterOptions = (e) => {
        // console.log(e.target.value)
        this.setState({filter: e.target.value})
    }

    handleChange = (e) => {
        this.setState({search: e.target.value})
    }

    newJobPage = () => {
        this.props.history.push("/jobs/booster/new",{user:this.state.user})
    }

    showPage = (job) => {
        this.props.history.push("/jobs/booster/"+job)
    }




    render(){
        

        let allJobs = this.state.jobs? this.state.jobs.filter((job) => {
            let dueDate = new Date(job.due_date)
            return job.requested_by.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
            job.job_address.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
            job.job_order_number.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1  ||
            dueDate.toDateString().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        }): null

        const jobList =  allJobs? allJobs.sort((a,b)=>a[this.state.filter] - b[this.state.filter]).map((job, index) => {
            if(this.props.archive){
                return(
                    <>
                    {job.completed? 
                        <div key={index} className="index-display" onClick={()=>this.showPage(job.id)}>
                        <p> <strong>Job Order Number:  </strong> {job.job_order_number}</p>
                        <p className="stage-class5"> <strong>Stage:  </strong> 5</p>
                        <p> <strong>Customer:  </strong> {job.requested_by} </p>
                        <p><strong>Site Location:   </strong> {job.job_address} </p>
                        <p><strong>Job Description:   </strong> {job.description} </p>
                        <p><strong>Due Date:    </strong><this.props.SpellOutDate date={job.due_date} /></p>
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
                    <p className={"stage-class"+job.stage}> <strong>Stage:  </strong> {job.stage}</p>
                    <p> <strong>Customer:  </strong> {job.requested_by} </p>
                    <p><strong>Site Location:   </strong> {job.job_address} </p>
                    <p><strong>Job Description:   </strong>  {job.description} </p>
                    <p><strong>Due Date:    </strong> <this.props.SpellOutDate date={job.due_date} /></p>
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
                        <input type="text" placeholder="search" value={this.state.search} onChange={this.handleChange} />
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