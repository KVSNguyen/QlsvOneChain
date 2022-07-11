import Home from './pages/Home/home';
import SignUp from './pages/register/signup';
import Login from './pages/Login/login';
import AddStudent from './pages/RCUDStudent/addStudent';
import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/Add' element={<AddStudent/>}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
