import React from 'react'
import Header from './[restaurant_slug]/component/Header'

const loading = () => {
  return (
    <div>
    <Header load={"Search For Hotel"} name={''}/>  
    <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
      <div className="p-3 shadow animate-pulse bg-slate-200 w-3/4 h-screen m-3 rounded overflow-hidden border cursor-pointer"></div>
      <div className="p-3 shadow animate-pulse bg-slate-200 w-1/3 h-72 m-3 rounded overflow-hidden border cursor-pointer"></div>
  </div>
  </div>
  )
}

export default loading