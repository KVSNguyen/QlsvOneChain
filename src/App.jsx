import Home from './pages/Home/home';
import SignUp from './pages/register/signup';
import Login from './pages/Login/login';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
