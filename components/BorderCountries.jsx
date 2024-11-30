import React from 'react'
import { NavLink } from 'react-router-dom';


const BorderCountries = ({ borderCountries }) => {

    return (
        <div className="border-countries">
            <div className="border-links">
                <b>Border Countries: </b>
                {borderCountries.length > 0 ? (
                    borderCountries.map((borderName, index) => (
                        <NavLink key={index} to={`/${borderName}`} className="border-link">
                            {borderName}
                        </NavLink>
                    ))
                ) : (
                    <p>No Border Countries</p>
                )}
            </div>
        </div>
    )
}

export default BorderCountries
