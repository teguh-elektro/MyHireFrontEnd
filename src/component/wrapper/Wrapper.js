import React from 'react'
import Appheader from './Appheader'

class Wrapper extends React.Component {
  constructor(){
    super();
    this.state={
      title: ''
    }
  }
  changeTitle(title){
    this.setState({
      title
    })
    this.props.changeSearch(title)
  }
  render () {
    return (
      <div id='page-container' className='sidebar-inverse side-scroll page-header-fixed page-header-inverse main-content-boxed'>
        <Appheader changeTitle={this.changeTitle.bind(this)} title={this.state.title} home={this.props.home}/>
           {this.props.children}
      </div>
    )
  }
}
export default Wrapper
