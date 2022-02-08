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

const App = () => {
  const [user, setUser] = useState('')
  const [adopts, setAdopts] = useState([])
  const [favorites, setFavorites] = useState([])

  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6IjBmMjQwNjZiMWYxMDc5MTQ5ZjMxNDY2NzM1ODliMDI0ZWNiYTM5YTk0ODQxNmM0NDFlMzQyNmZjMzk1M2M5NjBmZGJmZDE1ZjcxMTk4OGU4IiwiaWF0IjoxNjQ0MzM1OTEwLCJuYmYiOjE2NDQzMzU5MTAsImV4cCI6MTY0NDMzOTUxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.v0V08k7y9q1UVNE1kKsdmCk7ASg3QtckTpFzi_MVS_pKDBPi0U_icF2AX9HMzIBIJ5cTYRasNMUcaOLgx3YMXbH8g3_JbMy7RK3z-b6EWESAMhGdEkrNMPMO9487LQHIt18esqKUkIl42XNZXRXnzGCO4pDwdlM7n6xwipjSE67kwcXIS5FbpMj_0FG3rRNZe1pAgWhdPmLvcmVWcaDaefOKE-o1vhu1DWTycW0wqLBhy6h-Bcyg5UeFg0oY_L-IaYzpWwqk23gQMdQPqqal8IVgyDimMSJUH-HSLGLdZSx4s7rmTex0rJCeK_46RYBYvtmxE26ayaMakkSaELtjNw'

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
