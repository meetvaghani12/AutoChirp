import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  // If the user is not authenticated, redirect to the signin page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If the user is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 