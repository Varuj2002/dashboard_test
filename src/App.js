

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import TableBreak from './components/TableBreak';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const isLogin = !!JSON.parse(localStorage.getItem('accessToken'));
console.log(JSON.parse(localStorage.getItem('accessToken')), 'isLogin');
function App() {


  // if(isLogin){
    return( 
      <Routes>
    <Route path="/" element={<Layout />}>
      <Route path='/table' element={<TableBreak />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="newPassword" element={<NewPassword />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
    )
  // }

  // return (
  //   <Routes>
  //   <Route path="/" element={<Layout />}>
  //     <Route path="*" element={<Login />} />
  //   </Route>
  // </Routes>
  // );
}

export default App;