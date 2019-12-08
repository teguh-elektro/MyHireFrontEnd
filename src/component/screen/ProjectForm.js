import React from 'react'
import axios from 'axios'

const API_URL = 'http://18.233.99.1:3000';

class ProjectForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      skill: '',
      budget:'',
      description:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }    
  
  async handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    await this.setState({
    [name]: value
    });
    
  }

  async sendProject(){
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;  
    try{  
      const response = await axios({
        method: 'POST',
        url: API_URL+'/myhire/createproject',
        data: {
               name: this.state.name,
               skill: this.state.skill,
               budget: this.state.budget,
               description: this.state.description,
               done: '0'
        }
      })
    }catch(error) {
        console.log(error);
    }
  }

  async handleSubmit(event) {
    await this.sendProject();
    event.preventDefault();  
  }

  render(){
        return(
            <div className='container'>
            <div className='row'>
              <form >
                <div className='form-group row bf-light'>
                  <div className='col-12'>
                    <label htmlFor='contact1-firstname'>Name</label>
                    <input 
                        type='text' 
                        className='form-control'  
                        name='name' 
                        placeholder='Ex: Shopping Online' 
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                  </div>

                  <label className='col-12 mt-2' htmlFor='contact1-email'>Skill</label>
                  <div className='col-12 '>
                    <div className='input-group'>
                      <input 
                        type='text' 
                        className='form-control'  
                        name='skill' 
                        placeholder='Ex: Javascript'
                        value={this.state.skill}
                        onChange={this.handleChange} 
                     />
                    </div>
                  </div>
                  <div className='col-12 mt-2'>
                    <label htmlFor='contact1-firstname'>Budget</label>
                    <input 
                        type='number' 
                        className='form-control'  
                        name='budget' 
                        placeholder='Ex: Rp.8000.000' 
                        value={this.state.budget}
                        onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='col-12' htmlFor='contact1-msg'>Description</label>
                  <div className='col-12'>
                    <textarea 
                        className='form-control' 
                        name='description' 
                        rows={7} 
                        placeholder='Let me know description your project..' 
                        defaultValue='' 
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className='form-group row'>
                  <div className='col-12'>
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      onClick={this.handleSubmit}
                      
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
            </div>
        )
    }
}

export default ProjectForm;