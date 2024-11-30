import React, { useEffect, useMemo } from 'react';
import '../index.css';
import { NavLink } from 'react-router-dom';

const CountriesCards = ({ country }) => {

  const { name, flags, population, region, capital } = country

  return (
    <>
      <NavLink to={`/${country.name.common}`} state={country} className='cards'>
        <img src={flags.svg} alt={name + ' flag'} />
        <div className="detail">
          <h3>{name.common}</h3>
          <p><b>Population: </b>{population.toLocaleString('eng-in')}</p>
          <p><b>Region: </b>{region}</p>
          <p><b>Capital: </b>{capital}</p>
        </div>
      </NavLink>
    </>
  )
}

export default CountriesCards
