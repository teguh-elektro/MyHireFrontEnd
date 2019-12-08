import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
let isLogin = '2';

const API_URL = 'http://18.233.99.1:3000';
class Appheader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        search: '',
        person:[],
        isLogin:'1',
        title: '',
        myData: '',
        category: '0'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  async getMyData(){
    try{
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;
      const profile = await axios.get(API_URL+'/myhire/by')
      await this.setState({ 
        myData: profile.data.result[0]
     });
     //console.log(this.state.myData);
     
    }catch(error) {
        console.log(error);
    }
  }

  async handleChange(event) {
    const target = event.target;
    const value =  target.value;
    await this.props.changeTitle(value)
    
  }

  componentDidMount(){
    let category = localStorage.getItem('category');
    var token = localStorage.getItem('Authorization');
    axios.defaults.headers.common['Authorization'] = token;
    this.setState({
      category
    })
    this.getMyData();
    let login = localStorage.getItem('Login');
    if(login == '1'){
        this.setState({
            isLogin: '2'
        });
    }else{
      this.setState({
        isLogin: '1'
    });
    }
  }

  render () {
    return (
      <header id='page-header' className='bg-primary-light'>
        <div className='content-header'>
          <div className='content-header-section'>
            <div className='content-header-item'>
              <Link to='/'>
                <span className='font-size-xl text-primary-dark'>MyHire</span>
              </Link>
            </div>
          </div>
          <div className='content-header-item'>
          {(this.props.home === '1') &&
            <input 
                name="search" 
                type="text" 
                className="form-control" 
                placeholder="Search" 
                value={this.props.title}
                onChange={this.handleChange.bind(this)}
            />
          }
          </div>
        {
          (this.state.isLogin === '1') &&
            <div className='content-header-section'>
              <Link to={'/login'} className='btn btn-light min-width-125 mr-2'>Login</Link>
              <Link to={'/register'} className='btn btn-outline-primary min-width-125'>Register</Link>
          </div>
        }

        {
          (this.state.isLogin === '2') &&
          <div className="btn-group" role="group">
          <button type="button" className="btn btn-rounded btn-dual-secondary" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        < i className="fa fa-user d-sm-none" />
        <span className="d-none d-sm-inline-block">Profile</span>
        <i className="fa fa-angle-down ml-5" />
      </button>
        <div className="dropdown-menu dropdown-menu-right min-width-200" aria-labelledby="page-header-user-dropdown">
        {
                (this.state.category == '0')?
                  <Link to={'/profileengineer'} className="dropdown-item">
                    <i className="si si-user mr-5" /> Profile
                  </Link> 
                  :
                  <Link to={'/profilecompany'} className="dropdown-item">
                   <i className="si si-user mr-5" /> Profile
                  </Link>
        }
       
        <div className="dropdown-divider" />
        <div className="dropdown-divider" />
        <Link to={'/logout'} className="dropdown-item" >
          <i className="si si-logout mr-5" />Sign Out
        </Link>
      </div>
      </div>
        }
      </div>
      </header>
      
    )
  }
}
export default Appheader
