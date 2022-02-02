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
                                <p className="card-text">ID: {adopts.id}</p>
                                <p className="card-text">Gender: {adopts.gender}</p>
                                <button className="btn btn-danger">Like</button>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
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