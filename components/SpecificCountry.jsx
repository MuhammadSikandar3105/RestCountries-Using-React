import React, { useEffect, useState } from 'react';
import styles from '../styles/SpecificCountry.module.css';
import '../index.css';
import BorderCountries from './BorderCountries';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import CountryShimmer from './CountryShimmer';
import { useTheme } from '../hooks/Theme';

const SpecificCountry = () => {
    const [scountryData, setSCountryData] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const params = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [mode] = useTheme()

    const fetchBorder = async (data) => {
        if (data[0]?.borders) {
            try {
                const borderRequests = data[0].borders.map(async (borderCode) => {
                    try {
                        const res = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
                        const border = await res.json();
                        return border[0]?.name?.common || 'Unknown';
                    } catch {
                        return 'Unknown';
                    }
                });
                const borderData = await Promise.all(borderRequests);
                setBorderCountries(borderData);
            } catch (error) {
                console.error('Error fetching borders:', error);
            }
        } else {
            setBorderCountries([]);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://restcountries.com/v3.1/name/${params.country}?fullText=true`
            );
            const data = await response.json();

            if (response.ok && data.length > 0) {
                setSCountryData(data);
                fetchBorder(data);
                setNotFound(false);
            } else {
                setNotFound(true);
            }
        } catch (error) {
            console.error('Error fetching country data:', error);
            setNotFound(true);
        }
    };

    useEffect(() => {
        if (state) {
            setSCountryData([state]);
            fetchBorder([state]);
        } else {
            fetchData();
        }
    }, [params.country]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [params.country]);

    if (notFound) {
        return (
            <div className="not-found">
                <h2>Country Not Found</h2>
            </div>
        );
    }

    return scountryData === null ? (
        <CountryShimmer />
    ) : (
        <main className={`${styles.specificCountry} ${mode ? styles.darkMode : ''}`}>
            <div className="specificCountry">
                <a className="backbtn" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Back</span>
                </a>
                {Array.isArray(scountryData) ? (scountryData?.map((detail) => (
                    <div className="specific-country" key={detail.name.common}>
                        <div className="flag">
                            <img src={detail.flags.svg} alt={`${detail.name.common} flag`} />
                        </div>
                        <div className="country-name">
                            <h2>{detail.name.common}</h2>
                            <p>
                                <b>Native Name: </b>
                                {detail.name.nativeName
                                    ? Object.values(detail.name.nativeName)[0]?.common
                                    : detail.name.common}
                            </p>
                            <p>
                                <b>Population: </b>
                                {detail.population.toLocaleString('en-IN')}
                            </p>
                            <p>
                                <b>Region: </b>
                                {detail.region}
                            </p>
                            <p>
                                <b>Sub Region: </b>
                                {detail.subregion || 'No Sub Region'}
                            </p>
                            <p>
                                <b>Capital: </b>
                                {detail.capital ? detail.capital[0] : 'N/A'}
                            </p>
                        </div>
                        <div className="more-detail">
                            <p>
                                <b>Top Level Domain: </b>
                                {detail.tld ? detail.tld[0] : 'N/A'}
                            </p>
                            <p>
                                <b>Currency: </b>
                                {detail.currencies
                                    ? Object.values(detail.currencies)
                                        .map((currency) => currency.name)
                                        .join(', ')
                                    : 'N/A'}
                            </p>
                            <p>
                                <b>Languages: </b>
                                {detail.languages
                                    ? Object.values(detail.languages).join(', ')
                                    : 'N/A'}
                            </p>
                        </div>
                        <BorderCountries borderCountries={borderCountries} />
                    </div>
                ))) : <p>Invalid data format.</p>}
            </div>
        </main>
    );
};

export default SpecificCountry;
