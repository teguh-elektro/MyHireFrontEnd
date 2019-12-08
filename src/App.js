import React from 'react'
import  { 
  BrowserRouter as Router,
  Route,
  useParams
} from 'react-router-dom'
import Home from './component/screen/Home'
import Login from './component/screen/Login'
import Register from './component/screen/Register'
import Profile from './component/screen/Profile'
import Review from './component/screen/Review'
import Logout from './component/screen/Logout'
import 'dotenv/config'



class App extends React.Component{
  render(){
    
    return(
      <Router>
       
        <Route exact path ={'/'} component={Home}/>
        <Route  path ={'/login'} component={Login}/>
        <Route  path ={'/register'} component={Register}/>
        <Route  path ={'/profileengineer'}><Profile category = '0'/></Route>
        <Route  path ={'/profilecompany'}><Profile category = '1'/></Route>
        <Route  path ={'/profilereview/:id'} component={Review} />
        <Route path={'/logout'} component={Logout}/>
      </Router>
    )
  }
}

export default App
