import React from 'react'
import Header from './component/Header'
import Form from './component/Form'

const ReservationPage = () => {
  return (
    <div>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header />
          <Form />
        </div>
      </div>
    </div>
  )
}

export default ReservationPage