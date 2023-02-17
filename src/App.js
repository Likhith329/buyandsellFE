import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Sell from './Pages/Sell';
import Items from './Pages/Items';
import Checkoutsuccess from './Pages/Checkoutsuccess';
import Editpage from './Pages/Editpage';
import Users from './Pages/Users';
import Transactions from './Pages/Transactions';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='home' element={<Home/>}>
          <Route path='' element={<Items/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='transactions' element={<Transactions/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='sell' element={<Sell/>}/>
          <Route path='edit/:itemId' element={<Editpage/>}/>
          <Route path='checkout-success' element={<Checkoutsuccess/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
