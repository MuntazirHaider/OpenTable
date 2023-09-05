import React from 'react'
import Header from '../component/Header'
import Sidebar from './component/Sidebar'
import Card from './component/Card'

const SearchPage = () => {
  return (
    <div>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <Sidebar />
        <Card />
      </div>
    </div>
  )
}

export default SearchPage