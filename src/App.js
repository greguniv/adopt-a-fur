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
import Signup from './pages/SignUp';
import Favorites from './pages/Favorites';
import Adoptables from './pages/Adoptables';
// Contexts
import UserContext from './contexts/UserContext';

// curl -d "grant_type=client_credentials&client_id=U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX&client_secret=Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2" https://api.petfinder.com/v2/oauth2/token
// USE THIS TO GET A NEW TOKEN WHEN IT EXPIRES IN 1 HOUR

// api key = 'U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX'
// api secret = 'Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2'

// access token is the token itself; will need to have system store it as a variable and include it in the header of every API request until it expires and we request another
// TOKEN ONLY LASTS 1 HOUR

const App = () => {
  const [user, setUser] = useState('')
  const [adopts, setAdopts] = useState([])
  const [favorites, setFavorites] = useState([])

  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6IjU4MWJkNDQ5NGQ4OTI0MTgwNTI2NGVmYjM0MDc4NmQyMzlhMmI5YjIzMjYwNWM0MmQ4MGFiN2I0OWY4ZmQwZGZjMjVkOTJlNjgwNzFiNGYyIiwiaWF0IjoxNjQzOTkzMjA4LCJuYmYiOjE2NDM5OTMyMDgsImV4cCI6MTY0Mzk5NjgwOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.rn7F3Tg-4uXE4HLPm6kKeCVKMWEhOjnogufIzUb6bvnGtX9-2HzUT9-FbsRq5jqJ4sc2cVnYA52YTSfSfke8vFAxQtVk0_6jn_nrd98i1E2NBjMx6KhMcLHq6IG_8v03QjPastOmzOTsAVVFAYeo-sgs1pRV7MzmGQwpodHBZif08T-sPJut0unjJVpHbaOuCX9PiSrRWg8Ogsr-jpyqN8VFVlJIU-U-ssKygyS4smnfEfZcMpc7jqRsKcYhDj9GROJdR9aan9deqVadiASHaucC4q9IETXEfOOAX3CQ9hePie4HNUT6QroXLYiIZ4mHUlSGC5i1t23ErxDuiqdcog'

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
    // console.log('we added', adopts)
    setFavorites([...favorites, adopts])
  }

  const removeFavorite = (adopts) => {
    let newFavsArr = favorites.filter((item) => item !== adopts)
    setFavorites(newFavsArr)
  }

  return (
    <div className='App'>
      <UserContext.Provider value={user}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login setUser={setUser} />} />
          <Route path='signup' element={<Signup />} />
          <Route path='adoptables' element={<Adoptables adopts={adopts} addToFavorites={addToFavorites} />} />
          <Route path='favorites' element={<Favorites favorites={favorites} removeFavorite={removeFavorite} />} />
        </Routes>

        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
