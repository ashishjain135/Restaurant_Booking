/**
 * Page load
→ ProtectRoute
→ AuthContext check
→ loading?
→ token exists?
→ role allowed?
→ Outlet render

* what is protected routes ??
ans ->> Protected routes prevent unauthenticated access to sensitive pages.

*why use context api ??
ans ->> Authentication state is managed globally using Context API


*how to implement role based auth ??
ans ->>Role-based authorization restricts admin and user access.


* work of outlet ??
ans ->>React Router’s Outlet renders child routes only after validation

*if token expired 
ans ->> redirect to login pages 
 */


import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectRoute = ({ requiredRole }) => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error('AuthContext is not provided');
    return <Navigate to="/login" replace />;
  }

  const { authState } = context;

  if (authState.loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!authState.token || !authState.user) {
    return <Navigate to="/login" replace />;
  }

  console.log(authState.user.role )
  console.log(authState.user.role )
  console.log(authState.user.role )
  console.log(authState.user.role )

  if (requiredRole && authState.user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }  //if user access admin-panel route so redirect to / home 
  //Role-based authorization ensures users can only access permitted routes

  return <Outlet />;
};

export default ProtectRoute;