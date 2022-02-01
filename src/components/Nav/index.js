import { useContext } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext';

const Navbar = () => {
    const user = useContext(UserContext)
    

    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Adopt-A-Fur</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="adoptables">Browse Adoptable Pets</Link>
                        </li>
                        {
                            !user
                                ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="login">Login</Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className="nav-link" to="favorites">Favorites</Link>
                                </li>

                        }
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;