import React, {Component} from 'react';

class BoosterHome extends Component{
    constructor(props) {
       super(props)
       this.state = {

       } 
    }

    componentDidMount(){
        fetch('http://localhost:3000/boosters',{method:"GET"})
        .then((res) => {
            res.json()
            .then((data) => {
               console.log(data);
                
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
            </div>
        )
    }
}

export default BoosterHome