import React, {Fragment}from 'react'
import Wrapper from '../wrapper/Wrapper'
import Login from './Login'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const API_URL = 'http://18.233.99.1:3000';
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      disabled: true,
      projects: [],
      myData: '',
      name: '',
      gender: '',
      date_of_birth:'',
      email:'',
      phone_number:'',
      location:'',
      skill:'',
      showcase:'',
      description:'',
      photo: '',
      profession: '',
      isSubmit: '0',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.copyProfile = this.copyProfile.bind(this);
    this.editForm = this.editForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    await this.editForm()
    this.setState({isSubmit:'1'})
    await this.getMyData()
    event.preventDefault();

  }

  handleGameClik() {
    this.setState( {disabled: !this.state.disabled} )
  } 

  fileChange = event => {
      this.setState({
          photo: event.target.files[0]
      });  
  }

 copyProfile(){
    this.setState({
      name: this.state.myData.name,
      gender: this.state.myData.gender,
      date_of_birth: this.state.myData.date_of_birth,
      email:this.state.myData.email,
      phone_number: this.state.myData.phone_number,
      location: this.state.myData.location,
      skill:this.state.myData.skill,
      showcase:this.state.myData.showcase,
      description:this.state.myData.description,
      photo: this.state.myData.photo,
      profession:this.state.myData.profession
    })
    this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.editForm = this.editForm.bind(this);
  }

  async editForm() {
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'    
    try{
        console.log(this.state.myData.photo);
        
        let formData = new FormData();
        formData.append('photo', this.state.photo, this.state.photo.name);
        formData.append('description', this.state.description)
        formData.append('email', this.state.email)
        formData.append('name', this.state.name)
        formData.append('phone_number', this.state.phone_number)
        formData.append('location', this.state.location)
        if(this.state.category === '0'){
          formData.append('gender', this.state.gender)
          formData.append('date_of_birth', this.state.date_of_birth)
          formData.append('skill', this.state.skill)
          formData.append('showcase', this.state.showcase)
          formData.append('profession', this.state.profession)
        }
        console.log(formData);
        
        var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;  
      const response = await axios({
        method: 'PUT',
        url: API_URL+'/myhire/edit',
        data: formData
      });
    }catch(error) {
        console.log(error);
    }
  }

  async handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    await this.setState({
    [name]: value
    });
  }


  async getMyData(){
    try{
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;
      const profile = await axios.get(API_URL+'/myhire/by/')
      await this.setState({ 
        myData: profile.data.result[0]
     
      });
      console.log('tets');
     console.log(this.state.myData);
     this.copyProfile();
    }catch(error) {
        console.log(error);
    }
  }

  async getEngineer(id){
    try{
      
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;
      const profile = await axios.get(API_URL+'/engineer/by/'+id)
      console.log(profile.data[0])
      await this.setState({ 
        myData: profile.data[0]
     });
     console.log(this.state.myData)
     //console.log(this.state.myData);
     this.copyProfile();
    }catch(error) {
        console.log(error);
    }
  }

  async componentDidMount() {
    
    //await console.log( this.props.match.params.id );
    await this.getMyData()
    const category = localStorage.getItem('category');
    await this.setState({category})
    
   }
   
  render () {    
    
    console.log(this.state.myData.id === undefined);
    
    //if(this.state.myData.length === 0) return (<Redirect push to='/'/>)
    
    return (
      <Fragment>
        <Wrapper>
      <div className="bg-image bg-image-bottom" style={{backgroundImage: 'url("assets/media/photos/photo13@2x.jpg")', marginTop : 60}}>
      <div className="bg-primary-dark-op py-30">
        <div className="content content-full text-center">
          <div className="mb-15">
            
            <a className="img-link" href={`${API_URL}/myhire/file/${this.state.myData.photo}`}>
              <img className="img-avatar img-avatar96 img-avatar-thumb" src={`${API_URL}/myhire/file/${this.state.myData.photo}`} alt={this.state.myData.name} />
            </a>
          </div>
    <h1 className="h3 text-white font-w700 mb-10"> {this.state.myData.name}</h1>
          <h2 className="h5 text-white-op">
          {this.state.myData.profession} <a className="text-primary-light" href="javascript:void(0)">{this.state.myData.showcase}</a>
          </h2>}
          
    
          {/* END Actions */}
        </div>
      </div>
      </div>
   
      <div className="row mr-5" style={{marginLeft : 160}}>
      <div className="col-lg-12 mx-auto ">
      <form onSubmit = {this.handleSubmit}>
        <h2 className="content-heading text-black">My Project:</h2>
        <div className="row">
        <div className="col-lg-6 ">
          <div className="form-group row">
              <div className="col-lg-12">
                <label htmlFor="crypto-settings-firstname">Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="crypto-settings-firstname" 
                  name="name" 
                  value={this.state.name}
                  onChange={this.handleChange} 
                  disabled={(this.state.disabled)? "disabled" : ""} 
                />
              </div>
            </div>
            
            <div className="form-group row">
              <div className="col-lg-12">
                <label htmlFor="crypto-settings-street-1">Location</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="crypto-settings-street-1" 
                  name="location"
                  onChange={this.handleChange}  
                  value={this.state.location} 
                  disabled={(this.state.disabled)? "disabled" : ""}
                />
              </div>
            </div>
            
            <div className="form-group row">
              <div className="col-12">
                <label htmlFor="crypto-settings-street-2">Email</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="crypto-settings-street-2" 
                  name="email"
                  onChange={this.handleChange}  
                  value={this.state.email}
                  disabled={(this.state.disabled)? "disabled" : ""}
                />
              </div>
            </div>
            
            <div className="form-group row">
              <div className="col-12">
                <label htmlFor="crypto-settings-city">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="crypto-settings-city" 
                  name="phone_number" 
                  onChange={this.handleChange} 
                  disabled={(this.state.disabled)? "disabled" : ""}
                  value={this.state.phone_number}
                />
              </div>
            </div>
            {
              (this.state.category == '0')&&
              <div className="form-group row">
                <div className="col-12">
                  <label htmlFor="crypto-settings-postal">Skill</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="crypto-settings-postal" 
                    name="skill"
                    onChange={this.handleChange}  
                    value={this.state.skill}
                    disabled={(this.state.disabled)? "disabled" : ""}
                  />
                </div>
              </div>
            }

            {
              (this.state.category == '0')&&
              <div className="form-group row">
                <div className="col-12">
                  <label htmlFor="crypto-settings-postal">Showcase</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="crypto-settings-postal" 
                    name="showcase" 
                    disabled={(this.state.disabled)? "disabled" : ""}
                    value={this.state.showcase}
                    onChange={this.handleChange} 
                  />
                </div>
              </div>
            }
            
            {
              (this.state.category == '0')&&
              <div className="form-group row">
                <div className="col-12">
                <label htmlFor="crypto-settings-postal">profession</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="crypto-settings-postal" 
                    name="profession" 
                    disabled={(this.state.disabled)? "disabled" : ""}
                    value={this.state.profession}
                    onChange={this.handleChange} 
                  />
                </div>
              </div>
            } 

            {
              (this.state.category == '0')&&
              <div className="form-group row">
                  <div className="col-sm-12">
                  <label htmlFor="crypto-settings-street-1">Gender</label>
                      <select 
                          name='gender'
                          className="form-control" 
                          type='text'
                          value={this.state.gender}
                          onChange={this.handleChange}
                          disabled={(this.state.disabled)? "disabled" : ""}
                      >
                          <option value='0'>Male</option>
                          <option value='1'>Female</option>
                      </select>
                  </div>
              </div>
            } 
            {
              (this.state.category === '0')&&
              <div className="form-group row">
                <div className="col-12">
                  <label htmlFor="crypto-settings-street-1">Date of Birth</label>
                  <input 
                    type="date" 
                    className="form-control form-control-lg" 
                    name="date_of_birth" 
                    onChange={this.handleChange} 
                    value={this.state.date_of_birth} 
                    disabled={(this.state.disabled)? "disabled" : ""}
                    pattern="\d{4}-\d{2}-\d{2}"
                  />
                </div>
              </div>
            }
            <div className="form-group row">
              <div className="col-12">
                <label htmlFor="crypto-settings-postal">Description</label>
                <textarea 
                  className='form-control' 
                  id='contact1-msg' 
                  name='description' 
                  rows={7} 
                  value={this.state.description}
                  onChange={this.handleChange} 
                  disabled={(this.state.disabled)? "disabled" : ""}
                />
              </div>
            </div>
            {
              (!this.state.disabled)&&
                <div className="form-group row">
                  <div className="col-sm-6">  
                  <label htmlFor="inputEmail3">Photo</label>
                      <input 
                          name='photo'
                          type="file" 
                          class="form-control-file"
                          onChange={this.fileChange} 
                      ></input>                 
                  </div>
                </div>
            }
            
            <div className="form-group row">
              <div className="col-lg-6">
              {(!this.state.disabled)&&
              <button 
                type="submit" 
                className="btn btn-alt-primary" 
                
              >
                Update
              </button>
              }
               {
                (this.state.disabled && this.state.category === '0')&&
                <button 
                  type="button" 
                  className="btn btn-primary mb-5" 
                  onClick={this.handleGameClik.bind(this)}
                >
                        Edit    
                </button>
              }
              {
                (this.state.category === '3')&&
                <button 
                  type="button" 
                  className="btn btn-primary mb-5" 
                  //onClick={this.handleGameClik.bind(this)}
                >
                    Hire    
                </button>
              }
              </div>
              <div className="col-6">
              {(!this.state.disabled)&&
              <button 
                type="submit" 
                className="btn btn-alt-primary" 
                onClick={this.handleGameClik.bind(this)}
              >
                Cancel
              </button>
              }
              </div>
            </div>
          </div>
          <div className="col-lg-6">
          <div className="block">
          {
            (this.state.category === '1')&&
              <button 
              type="button" 
              className="btn btn-primary" 
              data-toggle="modal" 
              data-target="#exampleModal"
            >
              Add a New Project
            </button>
          }

          {/* Modal */}
          <div className="modal " id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Project Form</h5>
                  <button 
                    type="button" 
                    className="close" 
                    data-dismiss="modal" 
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                <ProjectForm/>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        {
          (this.state.category !== '3')&&
            <ProjectCard category={this.state.category}/>
        }
      </div>
                
     
        </div>
      </form>
      {(this.state.isSubmit=='1')&&<Redirect push to='/profileengineer'></Redirect>}
      </div>
      </div>
      </Wrapper>
      </Fragment>
    
    )
  }
}
export default Profile