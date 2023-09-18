import React from 'react'
import Header from '../component/Header'

const loading = () => {
  return (
    <div>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
      <div className="p-3  shadow animate-pulse bg-slate-200 w-1/5 h-screen m-3 rounded overflow-hidden border cursor-pointer"> </div>
      <div className="p-3 shadow animate-pulse bg-slate-200 w-3/4 h-screen m-3 rounded overflow-hidden border cursor-pointer"> </div>
    </div>
    </div>
  )
}

export default loading