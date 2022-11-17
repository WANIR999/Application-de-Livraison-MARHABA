import React from 'react';
import "./app.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Foget_password from './components/Forget_password';
import Reset_password from './components/Reset_password';
import Error from './components/Errorpath';
import Home from './components/Home';
import Plats from './components/PlatsPage';
import Dashboard from './components/Dashboard';
import Logout from './components/logout';
import Navbar from './components/Navbar';
import Private from './privateroutes_component.js/Privateroutes';
import NoauthRoutes from './privateroutes_component.js/NoauthRoutes';
import ClientRoutes from './privateroutes_component.js/clientPrivateRoutes';
import LivreurRoutes from './privateroutes_component.js/livreurRoutes';
import ManagerRoutes from './privateroutes_component.js/managerRoutes';


function App() {
  return (
    <Router>
     <div>
      <Routes>
        <Route element={<Private/>}>
        <Route path='auth' element={<Navbar/>}>
        <Route path=':role/resetpassword' element={<Reset_password/>}/>
        <Route path=':role/logout' element={<Logout/>}/>
        </Route>

        <Route element={<ClientRoutes/>}>

        <Route path='auth' element={<Navbar/>}>
        <Route path='client/home' element={<Plats/>}/>

        </Route>
        </Route>

        <Route element={<LivreurRoutes/>}>
        <Route path='auth' element={<Navbar/>}>
        <Route path='livreur/home' element={<Home/>}/>
        </Route>
        </Route>

        <Route element={<ManagerRoutes/>}>

        <Route path='auth' element={<Navbar/>}>
        <Route path='manager/home' element={<Dashboard/>}/>

        </Route>
        
        </Route>
        </Route>

        <Route element={<NoauthRoutes/>}>
        <Route path='Register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='forgetpassword' element={<Foget_password/>}/>
        </Route>


   

       <Route path='accessdenied' element={<Error/>}/>
       <Route path='*' element={<Error/>}/>
      </Routes>
      </div>
    </Router>
      

  );
}

export default App;
