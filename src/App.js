import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Sell from './Pages/Sell';
import Items from './Pages/Items';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='home' element={<Home/>}>
          <Route path='' element={<Items/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='sell' element={<Sell/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
