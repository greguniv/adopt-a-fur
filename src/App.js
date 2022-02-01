import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css';
// Components
import Navbar from './components/Nav'
// Pages
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Adoptables from './pages/Adoptables';
import Login from './pages/Login';
// Contexts
import UserContext from './contexts/UserContext';

// curl -d "grant_type=client_credentials&client_id=U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX&client_secret=Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2" https://api.petfinder.com/v2/oauth2/token
// USE THIS TO GET A NEW TOKEN WHEN IT EXPIRES


// petfinder API key: U9LdrXEh3kfDyJcOchJ6IhdXvtw7fIaVvlVj6rt4t4BmVo6efX

// petfinder Secret: Y5lS7OxvO8L2tZrEuWOTgAw2rw9AZ9HiAbCDT7S2

// CURRENT access_token : eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6ImVhOGRlZjNlNDRiYjAzMGRlMDM0NmUxZWZkYjdiZDhhZjBkZTAwYjM1OWQyYjQ2M2Y5MjhmZDU2MzNkMDg1ZDM1MzFhNzJmOTY2NWJlZjdmIiwiaWF0IjoxNjQzNzMwMjEwLCJuYmYiOjE2NDM3MzAyMTAsImV4cCI6MTY0MzczMzgxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.MubiK-712Tf0Hv5LlsuQkCv8rfBzxmfaDmlFLGisokmvBLfIH8CGWVVz59EhF8mnwawTDqv9QgKx5kXoH-AHRROVgLpRrfAeaoc0MI3buw02nded4y5WZJIUyMfTMkuP_wCHyM-IASZ8WjWgRMgbygp1RFjfmZisNhbYQvejv_Em6cyKHnlCjQNNEfwujfiB140AbxH5MVVQ5yvZhVDdLQQI_kWr60Jud2BbVzvIEmjTAXN-phziYm66bK1cLfpqq8KHQ-xBw2p_26iAVFfbpiR5Ah23VgUQaqYugVscQ9Ue_FJL8EgaWSEWoix85IbI5QM75tPEa4jU0uzyi_xzSQ

// access token is the token itself; will need to have system store it as a variable and include it in the header of every API request until it expires and we request another
// TOKEN ONLY LASTS 1 HOUR

const App = () => {

  const [adopts, setAdopts] = useState()

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJVOUxkclhFaDNrZkR5SmNPY2hKNkloZFh2dHc3ZklhVnZsVmo2cnQ0dDRCbVZvNmVmWCIsImp0aSI6ImVhOGRlZjNlNDRiYjAzMGRlMDM0NmUxZWZkYjdiZDhhZjBkZTAwYjM1OWQyYjQ2M2Y5MjhmZDU2MzNkMDg1ZDM1MzFhNzJmOTY2NWJlZjdmIiwiaWF0IjoxNjQzNzMwMjEwLCJuYmYiOjE2NDM3MzAyMTAsImV4cCI6MTY0MzczMzgxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.MubiK-712Tf0Hv5LlsuQkCv8rfBzxmfaDmlFLGisokmvBLfIH8CGWVVz59EhF8mnwawTDqv9QgKx5kXoH-AHRROVgLpRrfAeaoc0MI3buw02nded4y5WZJIUyMfTMkuP_wCHyM-IASZ8WjWgRMgbygp1RFjfmZisNhbYQvejv_Em6cyKHnlCjQNNEfwujfiB140AbxH5MVVQ5yvZhVDdLQQI_kWr60Jud2BbVzvIEmjTAXN-phziYm66bK1cLfpqq8KHQ-xBw2p_26iAVFfbpiR5Ah23VgUQaqYugVscQ9Ue_FJL8EgaWSEWoix85IbI5QM75tPEa4jU0uzyi_xzSQ"

  useEffect(() => {
    fetchAdopts()
  }, [])

  const fetchAdopts = async () => {
    try {
      const res = await axios.get('https://api.petfinder.com/v2/animals', {
        headers: {
          "Authorization": "Bearer " + token
        }
      }
      )
      setAdopts(res.data.animals)
      console.log(res.data.animals)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='App'>

    </div>
  );
}

export default App;
