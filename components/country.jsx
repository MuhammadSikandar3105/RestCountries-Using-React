import React, { useEffect, useState } from 'react';
import styles from '../styles/SpecificCountry.module.css';
import '../index.css';
import BorderCountries from './BorderCountries';
import { useTheme } from '../hooks/Theme';

const SpecificCountry = () => {
    const [countryData, setCountryData] = useState([])
    const [borderCountries, setBorderCountries] = useState([]);
    const [country, setCountry] = useState('')
    const [mode] = useTheme()

    useEffect(() => {
        const updateCountryFromUrl = () => {
            const currentCountry = new URLSearchParams(window.location.search).get('name');
            setCountry(currentCountry);
        };

        updateCountryFromUrl();

        // Re-run when the browser history changes
        window.addEventListener('popstate', updateCountryFromUrl);
        return () => window.removeEventListener('popstate', updateCountryFromUrl);
    }, [countryData, country]);

    useEffect(() => {
        if (!country) return;

        const fetchdata = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/name/${country}?fullText=true`
                );
                const data = await response.json();
                setCountryData(data);

                if (data[0]?.borders) {
                    const borderRequests = data[0].borders.map((borderCode) =>
                        fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`).then((res) =>
                            res.json()
                        )
                    );
                    const borderData = await Promise.all(borderRequests);
                    setBorderCountries(borderData.map((border) => border[0].name.common));
                } else {
                    setBorderCountries([]);
                }
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchdata();
    }, [country]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [country]);

    return (
        <>
            <main className={`${styles.specificCountry} ${mode === true ? 'darkMode' : ''}`}>
                <div className="specificCountry">
                    <a className="backbtn" onClick={() => {
                        window.history.back()
                    }}>
                        <i className="fa-solid fa-arrow-left"></i>
                        <span>Back</span>
                    </a>
                    {countryData.map((detail) => {
                        return (
                            <div className="specific-country" key={detail.name.common} >
                                <div className="flag"><img src={detail.flags.svg} alt="flag" /></div>
                                <div className="country-name">
                                    <h2>{detail.name.common}</h2>
                                    <p><b>Native Name: </b>{detail.name.common ? Object.values(detail.name.nativeName)[0].common : detail.name.common}</p>
                                    <p><b>Population: </b>{detail.population.toLocaleString('en-in')}</p>
                                    <p><b>Region: </b>{detail.region}</p>
                                    <p><b>Sub Region: </b>{detail.subregion ? detail.subregion : 'No Sub Region'}</p>
                                    <p><b>Capital: </b>{detail.capital ? detail.capital[0] : 'N/A'}</p>
                                </div>
                                <div className="more-detail">
                                    <p><b>Top Level Domain: </b>{detail.tld ? detail.tld[0] : 'N/A'}</p>
                                    <p><b>Currency: </b>{detail.currencies ? Object.values(detail.currencies).map((currency) => currency.name).join(', ') : 'N/A'}</p>
                                    <p><b>Languages: </b>{detail.languages ? Object.values(detail.languages).join(', ') : 'N/A'}</p>
                                </div>
                                {detail.borders ? (
                                    detail.borders.map((borderCode) => (
                                        <BorderCountries  borderCountries={borderCountries}  />
                                    ))
                                ) : (
                                    <p>No Border Countries</p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default SpecificCountry