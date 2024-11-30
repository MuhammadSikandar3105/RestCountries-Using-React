import React from 'react';
import '../styles/homeShimmer.css'

const HomeShimmer = () => {

    const maped = Array.from({ length: 15 }).map((ele, i) => {
        return <div key={i} className="shimmer cards"></div>
    })

    return (
        <>
            <div className="shimmer maincontent">
                <div className="shimmer cardsAll">
                    <div className="shimmer searchFilter">
                        <div className="shimmer search"></div>
                        <div className="shimmer filter"></div>
                    </div>
                    <div className="shimmer countries-container">
                        {maped}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeShimmer
