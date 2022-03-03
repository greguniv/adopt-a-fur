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

  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6IjI1ZTZhMDY5NTFlYjEwNTg3OGJmZmMzMjNiMjRhNTJkNTA3Y2YxMjVkNTFlNDU1YTRjYTRlYzFmNWUxZGY3YmVhMjEzNmI4ZDgxNThhMzY2IiwiaWF0IjoxNjQ2MzQxMTQ3LCJuYmYiOjE2NDYzNDExNDcsImV4cCI6MTY0NjM0NDc0Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.Me3MGmKrq_H-8ydbLCJWjTa2ZNUgO4hLtj0k9KpMIYZ5A_OF2xV9AcrTZ_oWPwbtR4oG-34NXBwPY-P6bvpRGb7JNlt8VoUhllglXct7-sFMG5Za_gyIxQpydAVM_J57ipC8HdyijtEfQnvTU7fF80MNseNbxYghfCP0x5Pa4gBBSb4aprqS806XxaXsEKr-M_AHw6d8aq2x2HHUifVMZ76D3V3md4hfB_SEqXwIAhPXXrYMcZk61CkUHcc2Rxdkxcds1IrIt4FCSrlLRJt1_u4arqu8aZQnTLmSa7i-b5nfo5yZHrAKr2DxJjrzEAKtMCHFTBydrbY7K0qa718baQ'

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
