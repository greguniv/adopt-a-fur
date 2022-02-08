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

// TOKEN ONLY LASTS 1 HOUR

const App = () => {
  const [user, setUser] = useState('')
  const [adopts, setAdopts] = useState([])
  const [favorites, setFavorites] = useState([])

  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6ImQ4M2U0MzhlYjM1YTg5ZWRmNmRhMTlmMjBmNDBlOWI1ZTc2NGZhNWM4NTllZDc2ZmEzMGQ0YWEyY2Y1ZjI5YTdlOGJmNzAzZjNjMzM3ODIwIiwiaWF0IjoxNjQ0MzMzMDc1LCJuYmYiOjE2NDQzMzMwNzUsImV4cCI6MTY0NDMzNjY3NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.sbrPu-ZXPSMJ73xwyM1wSnP-GFeU7BraWphc1-NUjL4Bek10fPN20VTFHlhmMy3Yg_M39M3ONXPjn-tH3Q9kzHi1AqqCewrHKo65lSoM8qCM7Ceqy9fSF_l_4QVj-U6SDpkUjlL2alcALcpSQ5iX8gIIDpCVJv2SsOPFFP5Wp1hsrSZG805wOEomiPmqyeiY0rBmKH0NAJteley8BRRe_Lb8Vg1FLg8S0bSAo4ypXLWscXeVyDKSltUZkIP28uMzpNOVxYRvfkr57UAvWnrLujPkv-g6K1h-gVU3cUX38Ej6rZu9N23iO4wrJ4A6vw8_JsLpRPOjeJOOmIkVbuaZfA'

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
