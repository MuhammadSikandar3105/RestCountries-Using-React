import React, { useEffect, useState } from 'react'
import Search from './Search'
import CountriesCards from './CountriesCards';
import SelectMenu from './SelectMenu';
import HomeShimmer from './HomeShimmer';
import { useTheme } from '../hooks/Theme';
import CountryData from '../countriesdata'


const Maincontent = () => {

    const [quiry, setQuiry] = useState('')
    const [region, setRegion] = useState('')
    const [countriesData, setCountriesData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [mode] = useTheme()



    useEffect(() => {
        const fetchCountries = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setCountriesData(data);
                setFilteredData(data);
            } catch (error) {
                setCountriesData(CountryData)
                setFilteredData(CountryData)
                console.error(`Error fetching data: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

    // filterd and search functinality
    const applyFilters = (query = quiry, selectedRegion = region) => {
        let filtered = countriesData

        if (selectedRegion) {
            filtered = filtered.filter((country) => country.region.toLowerCase().includes(selectedRegion.toLowerCase()))
        }

        if (query) {
            filtered = filtered.filter((country) => country.name.common.toLowerCase().includes(query))
        }

        setFilteredData(filtered)
    }
    const filteredCountries = (search) => {
        setQuiry(search)
        applyFilters(search, region)
    }

    const regionFilter = (filter) => {
        setRegion(filter)
        applyFilters(quiry, filter)
    }

    return isLoading ? (
        <HomeShimmer />
    ) : (
        <>
            <main className={`${mode === true ? 'darkMode' : ''}`} >
                <div className="maincontent">
                    <div className="cardsAll">
                        <div className="searchFilter">
                            <Search onSearch={filteredCountries} />
                            <SelectMenu onFilter={regionFilter} />
                        </div>
                        <div className="countries-container">
                            {filteredData.map((country) => {
                                return <CountriesCards key={country.name.common} country={country} />
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Maincontent
