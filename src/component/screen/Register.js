import React from 'react'

import { Redirect } from 'react-router-dom'
import Wrapper from '../wrapper/Wrapper'
import axios from 'axios'

const API_URL = 'http://18.233.99.1:3000';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        category: '0',
        isChange: '0'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendRegist = this.sendRegist.bind(this);
    this.handleError = this.handleError.bind(this)
    this.sendForm = this.sendForm.bind(this)
}
handleChange(event) {
  const target = event.target;
  const value =  target.value;
  const name = target.name;
  this.setState({
  [name]: value
  });

}

async sendForm() {
  var token = localStorage.getItem('Authorization');
  axios.defaults.headers.common['Authorization'] = token;
  console.log(token);
  try{
    const response = await axios({
      method: 'post',
      url: API_URL+'/myhire/form',
      data: {
        name: this.state.username
      }
    });
  }catch(error) {
      console.log(error);
  }
}

async handleSubmit(event) {
  if(this.state.username === ""){
    this.setState({isChange: '4'})
  }else if(this.state.password === ""){
    this.setState({isChange: '5'})
  }else{
    console.log('submit!');
    await this.sendRegist()
    await this.sendForm()
    this.setState({
      isChange: '1'
  })
  }
  
  event.preventDefault();
}

handleError(){
  this.setState({isChange: '0'})
}

async sendRegist() {
  try{
    const response = await axios({
      method: 'post',
      url: API_URL+'/myhire/regis',
      data: {
        username: this.state.username,
        password: this.state.password,
        category: this.state.category
      }
    });
    axios.defaults.headers.common['Authorization'] = response.data.result.token;
    localStorage.setItem("Authorization", response.data.result.token);
    localStorage.setItem("Login", '1');
      console.log(response.data.result.token);
      
    }catch(error) {
      console.log(error);
      this.setState({
          isChange: '2'
      })
    }
}

  render () {
    return (
      <Wrapper>
        <div className='hero-static content content-full animated fadeIn' data-toggle='appear' style={{marginTop :120}}>
          <div className="card col-lg-6 mx-auto pb-5">
          <div className='py-30 px-5 text-center'>
            <h1 className='h2 font-w700 mt-50 mb-10'>Create New Account</h1>
            <h2 className='h4 font-w400 text-muted mb-0'>Please insert your Username and Password</h2>
          </div>
          <div className='row justify-content-center px-5'>
            <div className='col-lg-12'>
            {(this.state.isChange=='2')&&
              <div class="alert alert-danger" role="alert">
                the username was there.
              <button 
                type="button" 
                class="close" 
                data-dismiss="alert" 
                aria-label="Close"
                onClick={this.handleError}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            }
            {(this.state.isChange=='4')&&
              <div class="alert alert-danger" role="alert">
                the username is empty.
              <button 
                type="button" 
                class="close" 
                data-dismiss="alert" 
                aria-label="Close"
                onClick={this.handleError}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            }
            {(this.state.isChange=='5')&&
              <div class="alert alert-danger" role="alert">
                the password is empty.
              <button 
                type="button" 
                class="close" 
                data-dismiss="alert" 
                aria-label="Close"
                onClick={this.handleError}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            }
              <form>
                <div className='form-group row'>
                  <div className='col-12'>
                    <div className='form-material floating'>
                      <input 
                        type='text' 
                        className='form-control' 
                        name='username' 
                        value={this.state.username}
                        onChange={this.handleChange}
                        placeholder="Username"
                      />
                   
                    </div>
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-12'>
                    <div className='form-material floating'>
                      <input 
                        type='password' 
                        className='form-control' 
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"
                      />
                      
                    </div>
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-12'>
                    <div className='form-material floating'>
                      <select 
                        className="form-control" 
                        name='category'
                        value={this.state.category}
                        onChange={this.handleChange}
                      >
                       <option value="0">Engineer</option>
                       <option value="1">Company</option>
                     </select>
                    </div>
                  </div>
                </div>
                <div className='form-group row text-center' />
                <div className='form-group row gutters-tiny'>
                  <div className='col-12 mb-10'>
                    <button 
                      type='submit' 
                      className='btn btn-block btn-hero btn-noborder btn-rounded btn-alt-primary'
                      onClick={this.handleSubmit}
                    >
                       Sign Up
                    </button>
                  </div>
                </div>
              </form>
              {(this.state.isChange=='1')&&<Redirect to='/'></Redirect>}
            </div>
            </div>
          </div>
         
        </div>
      </Wrapper>
    )
  }
}
export default Register
