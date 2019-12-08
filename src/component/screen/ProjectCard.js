import React from 'react'
import axios from 'axios'
const divBox = {
  color: 'white',
 
}
const API_URL = 'http://18.233.99.1:3000';
class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          category: '',
          projects: []
        }
        this.handleChange = this.handleChange.bind(this);
    

      }

   async componentDidMount(){
    const category = localStorage.getItem('category');
    await this.setState({category})
    await this.getMyProject();
  }

    async getMyProject(){
        try{
          var token = localStorage.getItem('Authorization');
            axios.defaults.headers.common['Authorization'] = token;
            axios.get(API_URL+'/myhire/readproject')
            .then(res => {
              const project = res.data;
              console.log(project.result);
              this.setState({ projects: project.result });
            })
          }catch(error) {
            console.log(error);
          }
      }

      async deleteProject(id_project){
        console.log(id_project);
        
        try{
          var token = localStorage.getItem('Authorization');
            axios.defaults.headers.common['Authorization'] = token;
            const response = await axios({
              method: 'DELETE',
              url: API_URL+'/myhire/deleteproject',
              data: {
                id: id_project
              }
            });
          }catch(error) {
            console.log(error);
          }
          
      }

      async editProject(id_project){
        await console.log(id_project);
        try{
            var token = localStorage.getItem('Authorization');
            axios.defaults.headers.common['Authorization'] = token;

            const response = await axios({
              method: 'PUT',
              url: API_URL+'/myhire/changeproject',
              data: {
                id: id_project,
                name: this.state.name,
                skill: this.state.skill,
                budget: this.state.budget,
                done: this.state.done,
                description: this.state.description
              }
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

    render () {        
      
    return (
        
        <div className="block mt-5">
        {
            this.state.projects.map((project, index) => {
                return(
                    <div>
                    <div className="block-content block-content-full bg-primary-light mt-3 " style={divBox} >                   
                        <div className="row align-items-center">
                        
                            <div className="col-sm-6 py-10">
                                <h3 className="h5 font-w200 ">
                                {project.name}
                                </h3>
                        
                                <p className="font-size-sm text-muted ">
                                {project.id}
                                </p>
                            </div>
                        
                            <div className="col-sm-6  text-md-right">
                                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target={"#collapseExample"+index} aria-expanded="false" aria-controls={"collapseExample"+index}>
                                    Details
                                </button>

                            </div>
                        </div>

                  

                    </div>
                          <div className="collapse" id={"collapseExample"+index}>
                          <div className="card card-body ">
                              <div className='col-12'>
                              <form >
                                <div className='form-group row bf-light'>
                                  <div className='col-12'>
                                    <label htmlFor='contact1-firstname'>Name Project</label>
                                    <input 
                                        type='text' 
                                        className='form-control'  
                                        name='name' 
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder={project.name}
                                    />
                                  </div>
                                  
                                  <div className='col-12'>
                                    <label htmlFor='contact1-firstname'>Budget</label>
                                    <input 
                                        type='number' 
                                        className='form-control'  
                                        name='budget' 
                                        value={this.state.budget}
                                        onChange={this.handleChange}
                                        placeholder={project.budget}
                                    />
                                  </div>

                                  <div className='col-12'>
                                    <label htmlFor='contact1-firstname'>Status</label>
                                    <select 
                                        name='done'
                                        className="form-control" 
                                        type='text'
                                        value={this.state.done}
                                        onChange={this.handleChange}
                                        placeholder={project.done}
                                    >
                                        <option value='0'>Proses</option>
                                        <option value='1'>Done</option>
                                        <option value='2'>Panding</option>
                                    </select>
                                  </div>

                                  
                    
                                  <div className='col-12'>
                                    <label htmlFor='contact1-firstname'>Skill</label>
                                    <input 
                                        type='text' 
                                        className='form-control'  
                                        name='skill' 
                                        value={this.state.skill}
                                        onChange={this.handleChange}
                                        placeholder={project.skill}
                                    />
                                  </div>


                                  <div className='col-12'>
                                    <label htmlFor='contact1-firstname'>Description</label>
                                    <textarea
                                        type='text' 
                                        className='form-control'  
                                        name='description' 
                                        value={this.state.description}
                                        rows={7}
                                        onChange={this.handleChange}
                                        placeholder={project.description}
                                    />
                                  </div>
                                </div>

                                
                              </form>
                              {
                                (this.state.category === '1')&&
                                <div className='row'>
                                  <button 
                                    className='btn btn-primary'
                                    onClick={this.editProject.bind(this, project.id)}
                                  >
                                    Edit
                                  </button>
                                  
                                  <button 
                                    className='btn btn-danger'
                                    onClick={this.deleteProject.bind(this,project.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              }
                                  
                              </div>
                          </div>
                      </div> 
                      </div>  
                    )
                })
        }
        </div>
    )
  }
}
export default ProjectCard/*  */

