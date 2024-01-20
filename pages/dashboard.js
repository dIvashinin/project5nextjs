import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { db } from '../config/firebaseConfig';

function Dashboard() {


  
  return (
    <ProtectedRoute>
    <div>
        
        <h1>Good to see you!</h1>
        
    </div>
    </ProtectedRoute>
  )
}

export default Dashboard;