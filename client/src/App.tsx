import React from 'react';
import {useCookies} from 'react-cookie'
import './App.css';
import Homepage from './components/Homepage';
import SignUpForm from './components/Signup'
import SignInForm from './components/SignIn';
import EmailInput from './components/EmailInput';
import NewPassword  from './components/NewPassword';
import NotesPage from './components/ViewNote';
import Profile  from './components/Profile';
import MainPage  from './components/Mainpage';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import LoginRedirect from './components/RedirectLogin';
import ChangePasswordForm from './components/ChangePassword';
import CollaboratorSignUpForm from './components/CollaboratorSignup';

function App() {
  const history = useHistory()
  const [Id, setId] = useCookies(['UserD', "sessMand"])
   let token = Id.UserD
      console.log({"App says" :token})
  // {token ? <Home /> : <Redirect to="/login" />}
const  pus = ()=>{
  history.push('/')
}
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/viewnotes/:id'>
            <NotesPage />
          </Route>
          <Route path='/'  exact>
            <MainPage />
          </Route>
          <Route path='/login'  exact>
            {token ?  <Redirect to="/home" /> :  <SignInForm />}
          </Route>
          <Route path='/signup' exact>
            {token ?  <Redirect to="/home" /> :  <SignUpForm />}
          </Route>
          <Route path='/collaboratorsignup/:token' >
          <CollaboratorSignUpForm />
          </Route>
          <Route path='/home' exact>
            {token ? <Homepage /> : <Redirect to="/login" />}
          </Route>
          
          <Route path='/redirect/:token'>
            <LoginRedirect />
          </Route>
          <Route path='/email'>
            {token ?  <Redirect to="/login" /> :  <EmailInput />}
          </Route>
          <Route path='/password/:token'>
            {token ?  <Redirect to="/login" /> :  <NewPassword />}
          </Route>
          <Route path='/profile'>
            {token ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path='/changepassword'>
          {token ? <ChangePasswordForm /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

