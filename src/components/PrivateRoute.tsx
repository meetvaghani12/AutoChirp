
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface PrivateRouteProps {
  redirectTo?: string;
}

export const PrivateRoute = ({ redirectTo = "/auth" }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();
  
  // If auth is still loading, show nothing or a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user is authenticated, render the child routes
  return <Outlet />;
};
