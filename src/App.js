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

  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6IjE4MTZiYzJlNTE4YTAwMzgyMDIzN2I2MzcxMjExM2ZjMjdiZjUyZDVhZjkxYzE3ZTVmMjQ5MzA5MTYyMzM4NGI1OGE4YWZjZTNmN2FkYTM2IiwiaWF0IjoxNjQ0MzM0OTI4LCJuYmYiOjE2NDQzMzQ5MjgsImV4cCI6MTY0NDMzODUyOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.bO_jXn04BJ3VRe-Q7uy-nRNCEZBBBQCePlMgb43U2lp-bpwGMnyKzwCg059xaRL8-nv1SPXnFuHNeBm1bXff-BHBXQM4i3-UX8bMjtp3asQN--zXMc_royoagV21rRJfpESXsMRCMX9qifeJ2hX_qMN8C6D1WQhqjUOXw1eDSBE5KSPvfnvGRcCwxnxVfkVDJksbFqIlMIqcvIqNRhausRKK9qso6nTDpbXau7hRZKOb_qEky0EiQ8jVqQm_D-VJKyKN9MjT8Hi9QL-vIStVKqpZU0dbJdV2Smj-_PePhStxJqL9Jf5IMsL6OXy5JGnQ781G6A8tKmoBjCmfdJp8cg'

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
