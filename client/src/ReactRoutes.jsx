import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Otp from './Pages/Otp';


const ReactRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/otp" element={<Otp />} />
        </Routes>
    )
}

export default ReactRoutes;