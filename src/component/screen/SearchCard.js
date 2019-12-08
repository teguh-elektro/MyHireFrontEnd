import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const API_URL = 'http://18.233.99.1:3000';
class SearchCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          projects: []
        }
        this.getsearch = this.getsearch.bind(this)
      }

   async componentDidMount(){
        this.getsearch();
  }

    getsearch() {
        var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;
        axios.get(`${API_URL}/myhire/search/?skill=${this.props.title}`)
            .then(async res => {
                const persons = await res.data.result
                await this.setState({ 
                    projects: persons 
                })
            })
        }

    render () {   
        if (this.state.projects.length > 0) {
            return (
        
                <div className="block mt-5">
                {
                    
                    this.state.projects.map((project, index) => {
                        return(
                            <div className='col-lg-3 animated fadeIn' data-toggle='appear'>
                                    {/* Property */}
                                    <div className='block block-rounded'>
                                    <div className='block-content p-0 overflow-hidden'>
                                        <Link to={'/home'} className='img-link' >
                                        <img className='img-fluid rounded-top' src={`http://localhost:3000/myhire/file/${project.photo}`} alt={project.name} />
                                        </Link>
                                    </div>
                                    <div className='block-content bg-light'>
                                <h4 className='font-size-h5 '>{project.name}</h4>
                                <h4 className='font-size-h5 '>{project.profession}</h4>
                                        <p className='text-muted'>
                                        <i className='fa fa-map-pin mr-2' /> {project.location}
                                        </p>
                                    </div>
                                    <div className='block-content mb-5'>
                                        <div className='row'>
                                        <div className='col-6'>
                                            
                                            <i className='fa fa-fw fa-star text-muted mr-2 ' /><strong>{project.rate}</strong>
                                            
                                <strong>{project.project}</strong>
                                        </div>
                                        <div className='col-6'>
                                            <p>
                                            <i className='fa fa-fw fa-cogs text-muted mr-2' />
                                            <strong>Skills:</strong>
                                            </p>
                                            <strong>{project.skill}</strong>
                                        </div>
                                        </div>
                                    </div>
                                
                                    </div>
                                    {/* END Property */}
                                </div>  
                            )
                        })
                }
                </div>
            )
        } else {
            return 'Loading...'
        }
    }
}
export default SearchCard/*  */

