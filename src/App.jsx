import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import PrivateRoute from '~/container/PrivateRoute';
import SignUp from '~/pages/Auth/SignUp'
import Home from '~/pages/Home'
import Login from '~/pages/Auth/Login'
import ForgotPassword from '~/pages/Auth/ForgotPassword';

import { AuthProvider } from '~/hooks/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/folder/null" ><Redirect to="/" /></PrivateRoute>

          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/folder/:folderId" component={Home} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
