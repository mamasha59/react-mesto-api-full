import React from 'react';
import {Route, Redirect} from 'react-router-dom';



function ProtectedRoute({component: Component, ...props}) {
  return <Route>
    function () {
    props.loggedIn ? <Component {...props}/> : <Redirect to='/login'/>
  }
  </Route>}

export default ProtectedRoute;
