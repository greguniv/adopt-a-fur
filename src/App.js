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

  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6IjcxMGI3NmEzOTg0ZDU2Y2Y3YzUwYzM4ZjU1MDc0YTZiMTYwZmNmYjBhZGU0ODhmNmE4MWQyMzUzYjE1MWNjZGMwZWUxOGNmMzMwM2NmNzQzIiwiaWF0IjoxNjQ0MzMwNzU2LCJuYmYiOjE2NDQzMzA3NTYsImV4cCI6MTY0NDMzNDM1Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.AW8PPPCjS3PhyGTFFfRm6KvSwFAQ6eSEalOwyXNpJ66expfbp6QyKZO8NF4cXEnTusiUQKHQskYnISdkXcLllENiWd2Wtx0rB88bZ8J_BySdqcH1J63MmtT35ZMFQBVk9W_rmirybMS0ldf_r_LksfYeb8mGJH7A62pZmLErJjUl9vIb0JX4p7wTGE5uk52C_KkbXrZKywUe_UIoxRbYUbAWJsKJQ4xBRRBpj5ZH0SvnhhiehtTs0fCcJBTUiQoix3U00qS0IrymDn75e-qhQHMHm1IfaIwQ83RHuO7TYaQ1Un-gSVnSQOgIgskU2F95D1BRex_r1yVt7UcAykjWcA'

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
