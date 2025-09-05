import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAdminAuth = localStorage.getItem('adminAuth') === 'true';
  
  return isAdminAuth ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
