import React from 'react'
class Postproject extends React.Component{
    render(){
        return(
            <div className='row'>
            <div className='col-lg-8 mx-auto'>
              <div className='block block-themed'>
                <div className='block-header bg-info'>
                  <h3 className='block-title'>Post a Job</h3>
                  <div className='block-options'>
                    <button type='button' className='btn-block-option' data-toggle='block-option' data-action='state_toggle' data-action-mode='demo'>
                      <i className='si si-refresh' />
                    </button>
                    <button type='button' className='btn-block-option' data-toggle='block-option' data-action='content_toggle' />
                  </div>
                </div>
                <div className='block-content'>
                  <form action='be_forms_premade.html' method='post' onsubmit='return false;'>
                    <div className='form-group row bf-light'>
                      <div className='col-12'>
                        <label htmlFor='contact1-firstname'>Job Name</label>
                        <input type='text' className='form-control' id='contact1-firstname' name='contact1-firstname' placeholder='Enter your Job Name..' />
                      </div>
                      <div className='col-12 mt-2'>
                        <label htmlFor='contact1-firstname'>Required Skill</label>
                        <input type='text' className='form-control' id='contact1-firstname' name='contact1-firstname' placeholder='Ex : Javascript, Python, Ruby...' />
                      </div>
                      <div className='col-12 mt-2'>
                        <label htmlFor='contact1-firstname'>Price</label>
                        <input type='text' className='form-control' id='contact1-firstname' name='contact1-firstname' placeholder='Ex : Rp. 5000000' />
                      </div>
                      <div className='col-12 mt-2'>
                        <label htmlFor='contact1-firstname'>Location</label>
                        <input type='text' className='form-control' id='contact1-firstname' name='contact1-firstname' placeholder='Enter your Location..' />
                      </div>
                    </div>
                    <div className='form-group row'>
                      <label className='col-12' htmlFor='contact1-msg'>Description</label>
                      <div className='col-12'>
                        <textarea className='form-control' id='contact1-msg' name='contact1-msg' rows={7} placeholder='Let me know about you..' defaultValue='' />
                      </div>
                    </div>
                    <div className='form-group row'>
                      <div className='col-12'>
                        <button type='submit' className='btn btn-info'>
                          <i className='fa fa-send mr-2' /> Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
export default Postproject