import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component, ...rest }: any) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Redirect to='/login' />
          ) : (
            <Route {...props} component={component} render={undefined} />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;