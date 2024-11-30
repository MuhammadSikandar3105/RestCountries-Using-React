    import React from 'react';
    import '../styles/shimmer.css';

    const CountryShimmer = () => {
        return (
            <>
                <div className="specificCountry">
                    <a className="shimmer backbtn"></a>
                    <div className="shimmer specific-country ">
                        <div className="shimmer flag"></div>
                        <div className="shimmer country-name">
                            <div className="name"></div>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <div className="shimmer more-detail">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default CountryShimmer
