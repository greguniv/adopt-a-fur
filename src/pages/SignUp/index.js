import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Signup = () => {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const handleChange = e => {
        setUsername(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setUsername(username)
        navigate('/adoptables')
    }


    return (
        <div id="form-container">
            <form className='mx-auto border p-2 m-2' id="login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputFullName"
                        className="form-label">Full Name</label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="userHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputUser1" className="form-label">Email address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputUser1"
                        aria-describedby="userHelp"
                        value={username}
                        onChange={handleChange}
                    />
                    <div id="userHelp" className="form-text">
                        We'll never share your username with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="signup-link">
                    Already have an account? <a href="./login">Log in!</a>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Signup;
