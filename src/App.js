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


// petfinder API key: U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX

// petfinder Secret: Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2

// CURRENT access_token : eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6ImI4N2M0YTllNGE5YWNmYWNmODlhMjhlNjYzMTRjYTk2ZDI0MjcxYTEyM2YxNTNkZmU4MDJkOTQxOGQ4MDQ3NjdkZjc4NGUxMDkyMWYyMWZlIiwiaWF0IjoxNjQzNzQ4NjU2LCJuYmYiOjE2NDM3NDg2NTYsImV4cCI6MTY0Mzc1MjI1Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.OQ2h8V74ugyV0abGvsRNxwUrQhVNM0u2LxPt_MrvzhW4BogzltzabR-OfgMQXvR9oqOhv-is9P21XTcM4xhuajffKzB9loMlWLObnv8f59ks2t7Rof7sC8Nc2Y2XN_TNiJNN1CF2TVNgrQ72MMutXGfUr3VOjaK12hP-tYRI01ODII74JN8ABWMANSHldOVrKna0TCKzYPys5htBfqcyQR_rcbZV09y1DxESb4BhS82By03q6JO97ZN3IEZMg4geiM5Q4sY7Ugb7Vc6kwXhcGscuHo6iqsbnMsxtghfVy_a4AheSza-ybMfkuJSHn-_B_xKhP_3iRDOxQhqf5Urs6g

// access token is the token itself; will need to have system store it as a variable and include it in the header of every API request until it expires and we request another
// TOKEN ONLY LASTS 1 HOUR

const App = () => {
  const key = 'U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX'
  const secret = 'Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2'

  const [user, setUser] = useState('')
  const [adopts, setAdopts] = useState([])
  const [favorites, setFavorites] = useState([])
  
  const tokenAccess = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6ImI4N2M0YTllNGE5YWNmYWNmODlhMjhlNjYzMTRjYTk2ZDI0MjcxYTEyM2YxNTNkZmU4MDJkOTQxOGQ4MDQ3NjdkZjc4NGUxMDkyMWYyMWZlIiwiaWF0IjoxNjQzNzQ4NjU2LCJuYmYiOjE2NDM3NDg2NTYsImV4cCI6MTY0Mzc1MjI1Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.OQ2h8V74ugyV0abGvsRNxwUrQhVNM0u2LxPt_MrvzhW4BogzltzabR-OfgMQXvR9oqOhv-is9P21XTcM4xhuajffKzB9loMlWLObnv8f59ks2t7Rof7sC8Nc2Y2XN_TNiJNN1CF2TVNgrQ72MMutXGfUr3VOjaK12hP-tYRI01ODII74JN8ABWMANSHldOVrKna0TCKzYPys5htBfqcyQR_rcbZV09y1DxESb4BhS82By03q6JO97ZN3IEZMg4geiM5Q4sY7Ugb7Vc6kwXhcGscuHo6iqsbnMsxtghfVy_a4AheSza-ybMfkuJSHn-_B_xKhP_3iRDOxQhqf5Urs6g'

  const fetchAdopts = async () => {
    try {
      const res = await axios.get('https://api.petfinder.com/v2/animals', {
        headers: {
          "Authorization": "Bearer " + tokenAccess
        }
      }
      )
      setAdopts(res.data.animals)
      // console.log(res.data.animals)
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
