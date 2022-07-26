import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import SignUp from "./pages/register/signupEmail";
import Login from "./pages/Login/login";
import SignUpPassword from "./pages/register/signUpPassword";
import SignUpInforUser from "./pages/register/SignUpInforUser";

function App() {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/SignUpEmail" element={<SignUp />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/SignUpPassword" element={<SignUpPassword />}></Route>
          <Route path="/SignUpInforUser" element={<SignUpInforUser />}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
