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
  
  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6ImJlNGQ1YmNhYjhjMzNjMGZiMTBiZGZmNzQwNzczODk5MzcwOWVkYTE4Nzk0MWNhYjlkMmJjMzAzNWI0NTg2MzVkZWE3ZDE5MzE0NGViZWRiIiwiaWF0IjoxNjQzODE2ODg0LCJuYmYiOjE2NDM4MTY4ODQsImV4cCI6MTY0MzgyMDQ4NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.dYrmv-vejbKQpkddfky9cHX_B_lXLGjGaEbV_XMvaFPCUjukzHFbNsWPiHMTJZxWKYd9abUbSDLHp_BM5CC3kawuJwEhSrJjNcRO64kICgdmM-KozZwXYQN-Gp9uuljhzLxRiTnPIN-U3AtML_iVCsAOnr0oJ8tReoLhx1ZfVuiJKlaP6FCryIQ5G6QE56exGZTzYiTCNQLsgIfXRfNhqs7Gij0K9GA1P19Hff1879V1Vd8eq_x93Wh_1EpbwZ5ebUjKxawxGs6gF6AgL7JjkOLWofvWpx97i2qwZzhtIvDuVdoditaHH6garEx-3xNTtV5FGmPxffyDdW2GATedrg'

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

  useEffect(() => {
    fetchAdopts();
  }, [])

  return (
    <div className='App'>
      <UserContext.Provider value={user}>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='adoptables' element={<Adoptables adopts={adopts} />} />
          <Route path='favorites' element={<Favorites />} />
        </Routes>

        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
