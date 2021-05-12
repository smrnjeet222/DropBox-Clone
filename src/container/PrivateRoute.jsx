import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '~/hooks/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {

  const { curUser } = useAuth();

  return (
    <Route {...rest}
      render={props => (
        curUser ?
          <Component {...props} />
          :
          <Redirect to="/login" />
      )}
    />
  )
}
