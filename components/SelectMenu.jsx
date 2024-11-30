import React from 'react'

const SelectMenu = ({ onFilter }) => {

  const handleFilter = (e) => {
    onFilter(e.target.value)
  }

  return (
    <>
      <select className="filter" onChange={handleFilter} >
        <option hidden>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  )
}

export default SelectMenu
