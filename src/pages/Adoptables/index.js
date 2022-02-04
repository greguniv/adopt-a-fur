import { useEffect, useState} from 'react';
import axios from 'axios'
import './styles.css'

const Adoptables = ({ adopts, addToFavorites }) => {
    console.log(adopts)

    return (
        <div className='adopts-container'>
                {   adopts &&
                    adopts.map(adopts => (
                        <div className="card adopt-card" key={adopts.id}>

                            <img src={adopts.primary_photo_cropped ?
                                adopts.primary_photo_cropped?.small  :
                                "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1732584287.jpg"} className="card-img-top" alt="..." />

                            <div className="card-body">
                                <h5 className="card-name">{adopts.name}</h5>
                                <p className="card-age">Age: {adopts.age}</p>
                                <p className="card-gender">Gender: {adopts.gender}</p>
                                <p className="card-status">Breed: {adopts.breeds?.primary}</p>
                                <p className="card-description">{adopts.description}</p>
                                <button className="btn btn-danger" onClick={() => addToFavorites(adopts)}>Like</button>
                                <a href={adopts.url} className="btn btn-primary">More Info</a>
                            </div>
                        </div>
                    ))
                }
            </div>
    );
}

export default Adoptables;

// {
//     adopts.map(adopts => (
//         <div key={adopts?.id}>
//             {adopts.name}
//         </div>
//     ))
// }