import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import Login from './Pages/Login';


const ReactRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}

export default ReactRoutes;