import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

function dashboard() {
  return (
    <ProtectedRoute>
    <div>
        
        dashboard
        
    </div>
    </ProtectedRoute>
  )
}

export default dashboard