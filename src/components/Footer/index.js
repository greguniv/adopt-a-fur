import React from 'react';
import './styles.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='subfooter'>
                <div className="subfooter-social-links">
                <ul>
                    <li>
                        <a href='https://www.facebook.com/Petfinder'>F</a>
                    </li>
                    <li>
                        <a href='https://twitter.com/Petfinder'>Twitter</a>
                    </li>
                    <li>
                        <a href='https://www.instagram.com/petfinder/'>Instagram</a>
                    </li>
                    <li>
                        <a href='https://www.youtube.com/channel/UC85FmJhwKDfiXfialMvyM5g'>Youtube</a>
                    </li>
                    <li>
                        <a href='https://pinterest.com/petfinder/'>P</a>
                    </li>
                </ul>
                </div>
                <div className='subfooter-copyright'>
                    <h6>
                        ©2022 <a href='https://www.petfinder.com/developers/'>Petfinder.com</a>
                    </h6>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
