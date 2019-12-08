import React from 'react'
import Wrapper from '../wrapper/Wrapper'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://18.233.99.1:3000';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      isvalid: '0'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.handleRegist = this.handleRegist.bind(this)
  }
  handleChange(event) {
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
    [name]: value
    });
}

handleSubmit(event) {
    console.log('submit!');
    this.sendLogin();
    event.preventDefault();

}

async sendLogin() {
    try{
      const response = await axios({
        method: 'post',
        url: API_URL+'/myhire/login',
        data: {
          username: this.state.username,
          password: this.state.password
        }
      });
      console.log(response.data.result.category);
      
      axios.defaults.headers.common['Authorization'] = response.data.result.token;
      localStorage.setItem("Authorization", response.data.result.token);
      localStorage.setItem("Login", '1');
      localStorage.setItem("category", response.data.result.category);
      this.setState({
        isvalid: '2'
      })
      
      
      }catch(error) {
        console.log(error);
        this.setState({
          isvalid: '1'
        })
      }
  }

  handleRegist(){
    this.setState({
      isvalid: '3'
    })
  }

  render () {
    return (
      <Wrapper>
        <div className='hero-static content content-full bg-white animated fadeIn' data-toggle='appear'>
          <div className='py-30 px-5 text-center'>
            <h1 className='h2 font-w700 mt-50 mb-10'>Welcome to Myhire</h1>
            <h2 className='h4 font-w400 text-muted mb-0'>Please sign in</h2>
          </div>
          <div className='row justify-content-center px-5'>
            <div className='col-sm-8 col-md-6 col-xl-4'>
            {(this.state.isvalid === '1')?<div className="alert alert-danger" role="alert">the username or password invalid</div>:null}
              <form className='js-validation-signin'>
                <div className='form-group row'>
                  <div className='col-12'>
                    <div className='form-material floating'>
                      <input 
                        type='text' 
                        className='form-control' 
                        id='login-username' 
                        name='username'
                        value = {this.state.username} 
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
                        id='login-password' 
                        name='password' 
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder ="Password"
                      />
                     
                    </div>
                  </div>
                </div>
                <div className='form-group row gutters-tiny'>
                  <div className='col-12 mb-10'>
                    <button 
                      type='submit' 
                      className='btn btn-block btn-hero btn-noborder btn-rounded btn-alt-primary'
                      onClick={this.handleSubmit}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
                  <button 
                      type='submit' 
                      className='btn btn-block btn-hero btn-noborder btn-rounded btn-primary'
                      onClick={this.handleRegist}
                    >
                      Sign Up
                    </button>
              {(this.state.isvalid==='2')&&<Redirect push to='/'></Redirect> }
              {(this.state.isvalid==='3')&&<Redirect push to='/register'></Redirect> }
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
export default Login
