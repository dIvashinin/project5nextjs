import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

function dashboard() {
  return (
    <ProtectedRoute>
    <div>
        
        <h1>dashboard</h1>
        
    </div>
    </ProtectedRoute>
  )
}

export default dashboard