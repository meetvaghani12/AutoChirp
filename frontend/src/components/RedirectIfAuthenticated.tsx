import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RedirectIfAuthenticated = () => {
  const { user } = useAuth();
  
  // If the user is already authenticated, redirect to the dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, render the child routes (signin/signup)
  return <Outlet />;
};

export default RedirectIfAuthenticated; 