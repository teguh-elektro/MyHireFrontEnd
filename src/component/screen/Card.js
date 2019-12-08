import React from 'react'

import {Link} from 'react-router-dom'

const divBox = {
  color: 'white',
  boxShadow : '0 20px 20px #777'
}

const API_URL = 'http://18.233.99.1:3000';
class Card extends React.Component {

  render () {
    return (
      
      <div className='col-lg-3 animated fadeIn' data-toggle='appear' >
        {/* Property */}
        <div className='block block-rounded bg-dark' style={divBox} >
          <div className='block-content p-0 overflow-hidden' style={{width : '100%', height : 200}}>
            <Link to={'/profilereview/'+this.props.created_by} className='img-link' >
              <img className='img-fluid rounded-top' src={`${API_URL}/myhire/file/${this.props.photo}`} alt={this.props.name} style={{maxWidth : '100%'}}/>
            </Link>
          </div>
          <div className='block-content bg-primary-light text-white' style={{height : 85}}>
    <h3 className='font-size-h3 text-white text-center '>{this.props.name}</h3>
    <h4 className='font-size-h5 text-white text-center'>{this.props.profession}</h4>
            <p className='text-muted mr-3'>
              <i className='fa fa-map-pin  text-white' /> <strong className="text-white">{this.props.project}</strong>
            </p>
          </div>
          <div className='block-content mb-5 bg-primary' style={{height : 90}}>
            <div className='row'>
              <div className='col-6'>
                
                  <i className='fa fa-fw fa-star text-white mr-2 ' /><strong className="text-white">{this.props.rate}</strong>
                
    
              </div>
              <div className='col-6'>
               
                  <i className='fa fa-fw fa-cogs text-white mr-2' />
                  <strong>Skills:</strong>
               
                
                  <h6 className="" style={{marginBottom :60, color : 'white'}}>{this.props.skill}</h6>
                  
              </div>
            </div>
          </div>
       
        </div>
        {/* END Property */}
      </div>
    )
  }
}
export default Card/*  */
