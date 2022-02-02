import { useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import './styles.css'

const Adoptables = ({ adopts }) => {
    console.log(adopts)

    return (
        <div className='adopts-container'>
                {
                    adopts.map(adopts => (
                        <div className="card adopt-card" key={adopts.id}>

                            <img src={adopts.primary_photo_cropped ?
                                adopts.primary_photo_cropped?.small  :
                                null} className="card-img-top" alt="..." />

                            <div className="card-body">
                                <h5 className="card-title">{adopts.name}</h5>
                                <p className="card-id">ID: {adopts.id}</p>
                                <p className="card-gender">Gender: {adopts.gender}</p>
                                <p className="card-status">Status: {adopts.status}</p>
                                <p className="card-description">{adopts.description}</p>
                                <button className="btn btn-danger">Like</button>
                                <a href={adopts.url} className="btn btn-primary">Adopt Me?</a>
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