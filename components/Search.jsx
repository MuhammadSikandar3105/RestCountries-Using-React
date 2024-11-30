import React from 'react'

const Search = ({ onSearch }) => {

  const handleSearch = (e) => {
    onSearch(e.target.value)
  }


  return (
    <>
      <div className="search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input onInput={handleSearch} className="searchInput" type="text" placeholder="Search for a country..." />
      </div>
    </>
  )
}

export default Search
