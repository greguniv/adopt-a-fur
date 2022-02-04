import React from 'react';

const Favorites = ({ favorites, removeFavorite }) => {

    return (
        <div className='adopts-container'>
            {favorites &&
                favorites.map(adopts => (
                    <div className="card adopt-card" key={adopts.id}>

                        <img src={adopts.primary_photo_cropped ?
                            adopts.primary_photo_cropped?.small :
                            "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1732584287.jpg"} className="card-img-top" alt="..." />

                        <div className="card-body">
                            <h5 className="card-title">{adopts.name}</h5>
                            <p className="card-gender">Gender: {adopts.gender}</p>
                            <p className="card-status">Status: {adopts.status}</p>
                            <p className="card-description">{adopts.description}</p>
                            <button className="btn btn-danger" onClick={() => removeFavorite(adopts)}>Remove</button>
                            <a href={adopts.url} className="btn btn-primary">Adopt Me?</a>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Favorites;
