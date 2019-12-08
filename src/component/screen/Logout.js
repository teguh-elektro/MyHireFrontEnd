import { Redirect } from 'react-router-dom'
import React from 'react'
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const API_URL = 'http://18.233.99.1:3000';
class Logout extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          islogout: '0'
      }
      this.sendLogout = this.sendLogout.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async sendLogout() {
      try{
        const response = await axios({
          method: 'get',
          url: API_URL+'/myhire/logout',
        });
          console.log(response.data.result);
          localStorage.removeItem("Authorization");
          localStorage.removeItem("category");
        }catch(error) {
          console.log(error);
        }
    }
    
    handleSubmit(event) {
        console.log('submit!');
        this.sendLogout() 
        this.setState({
            islogout: '1'
        })
        localStorage.setItem("Login", '0');
        event.preventDefault();
    }
  
    render(){
      return (
        <div className='container mt-5'>
        <div className='row'>
            <div className='col-sm-4'></div>
            <div className='col-sm-4'>
                <div className="card" style={{width: '480px', height: '480px'}}>
                    <div className="card-body">
                    <h5 className="card-title">Log out</h5>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Logout</button>
                    {(this.state.islogout==='1')&&<Redirect push to='/login'></Redirect> }
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
    
  }
  
  export default Logout;