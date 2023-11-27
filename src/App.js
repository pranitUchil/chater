import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';
import Dashboard from './components/Dashboard';
import ImageUploadForm from './components/ImageUploadForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register}/>
          <Route path="/forget-password" Component={Forgotpassword}/>
          <Route path="/dashboard" Component={Dashboard}/>
          <Route path="/test" Component={ImageUploadForm}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
