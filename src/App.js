import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
// Components
import Navbar from './components/Nav'
import Footer from './components/Footer';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Adoptables from './pages/Adoptables';
// Contexts
import UserContext from './contexts/UserContext';

// curl -d "grant_type=client_credentials&client_id=U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX&client_secret=Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2" https://api.petfinder.com/v2/oauth2/token
// USE THIS TO GET A NEW TOKEN WHEN IT EXPIRES IN 1 HOUR

// access token is the token itself; will need to have system store it as a variable and include it in the header of every API request until it expires and we request another
// TOKEN ONLY LASTS 1 HOUR

const App = () => {
  const key = 'U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX'
  const secret = 'Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2'

  const [user, setUser] = useState('')
  const [adopts, setAdopts] = useState([])
  const [favorites, setFavorites] = useState([])
  
  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6Ijk4MzMwYTUyZTZlNDQxYjM2YzQwMjM2MTMyZDcyODVkOTdhYWFlZjZjNmVkNWY0ZTI0ODVjZTMzNTU4NmIyNWI0YzZiZmQ4MjZkMmJmZGM2IiwiaWF0IjoxNjQzODIwNTE0LCJuYmYiOjE2NDM4MjA1MTQsImV4cCI6MTY0MzgyNDExNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.pwv8LYpDQMI4Y8kMBwoA6AciEs2Z88JpZmHxUnb0VT8YeZSUaA-D7R13O_M4qypMylh05k-1EOLGmcoQ3BWdddU4tXM9-d-WOHizSsrmNQ-JF8VnEWwyypvNLxa8I7oGZa3cz101QsQtFFg6DIT4HCZgBYvAzTC2PbzNmlUGRE6pTcxaV1GN4l50QrAJ_bhu-aUzJPotw8I6Ih_2wH-xEzgh8BjGPosRAcSUkSSM0GnCdpuYYexNksECdBlshtYMnsZeM0zflwatp1wk-tbHWviaOt4c0StbsOrooA-SAmIW5adQzdtQZmJHIzePy7P83CTTpCSRM1C8h3H18shNQg'
  
  useEffect(() => {
    fetchAdopts();
  }, [])

  const fetchAdopts = async () => {
    try {
      const res = await axios.get('https://api.petfinder.com/v2/animals', {
        headers: {
          "Authorization": "Bearer " + tokenAccess
        }
      }
      )
      setAdopts(res.data.animals)
    } catch (error) {
      console.log(error)
    }
  }

  const addToFavorites = (adopts) => {
    console.log('we added', adopts)
    setFavorites([...favorites, adopts])
  }

  return (
    <div className='App'>
      <UserContext.Provider value={user}>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login setUser={setUser} />} />
          <Route path='adoptables' element={<Adoptables adopts={adopts} />} />
          <Route path='favorites' element={<Favorites favorites={favorites}/>} />
        </Routes>

        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
