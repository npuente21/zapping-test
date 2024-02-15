import { Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = (props) => {
    const {children, authenticated, getUserProfile} = props;
    useEffect(() => {

      getUserProfile();
    }, [getUserProfile]);
  
    return (
        authenticated ? children : <Navigate to="/login" />
    );
  };
  export default PrivateRoute;