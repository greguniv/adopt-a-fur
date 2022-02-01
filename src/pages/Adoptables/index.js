import { useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import './styles.css'

const Adoptables = ({ adopts }) => {
    console.log(adopts)

    return (
        <div>
            Pets to Adopt go Here!
            {
                adopts.map(adopts => (
                    <div key={adopts?.id}>
                        {adopts.name}
                    </div>
                ))
            }
        </div>
    );
}

export default Adoptables;
