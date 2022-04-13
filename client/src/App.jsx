import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./App.scss"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
