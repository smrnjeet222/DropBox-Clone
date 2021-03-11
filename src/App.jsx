import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from '~/container/PrivateRoute';
import SignUp from '~/pages/Auth/SignUp'
import Dashboard from '~/pages/Dashboard'
import Login from '~/pages/Auth/Login'
import ForgotPassword from '~/pages/Auth/ForgotPassword';

import { AuthProvider } from '~/store/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
