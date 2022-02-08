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

  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6IjViMGZhNmM2ZmRmZWQwMjQyNDY1ZjZkZWQwZGZlOWFkNGY3NWNhMzc2MTZkZTdmZTFkNmQwYjM4YTk2NDUyNGE0N2UzMThhNjdhZDgzYmM5IiwiaWF0IjoxNjQ0Mjk0ODUyLCJuYmYiOjE2NDQyOTQ4NTIsImV4cCI6MTY0NDI5ODQ1Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.JJyLTKAqr1vPDJPVIoTd82jTyj2uKnTU3fcenaMvMBwa9sN_89FmLW3c02J7LmCii_unvkVifXKY_UGB4aB0jtn2RfkqY22nrSaNPM8DvvaiZCq_hczkEddJyb9spYSVVbineqaIy8QEaTq3m7FLB_3f9zmU4SFpY2RslHZibXOk16rdWir8tlK8PaFnqee9mi80sC-3rRzcmBlieIZd4u8tTe-KMrqXMbGsF0cR-MhLWILo2NUHet9gi7QD0pJTMwVRHVWK80pTjvgqNRRm5iADnullIUH-d4ppEqSrJvEfE4QivgMpeT2gqhbpQLuh6pr_Xn6cOhtRzN0tiDL3YQ'

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
