import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import SignUp from './pages/register/signupEmail';
import Login from './pages/Login/login';
import AddStudent from './pages/RCUDStudent/addStudent';
import SignUpPassword from './pages/register/signUpPassword';


function App() {

  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/Add' element={<AddStudent/>}></Route>
          <Route path='/SignUpPassword' element = {<SignUpPassword />}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
