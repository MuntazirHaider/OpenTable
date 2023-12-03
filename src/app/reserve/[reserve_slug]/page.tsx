import React from 'react'
import Header from './component/Header'
import Form from './component/Form'

export interface searchParams {
  partySize: string
  date: string
  time: string
}

const ReservationPage = ({
  params,
  searchParams
}: {
  params: { reserve_slug: string }
  searchParams: searchParams
}) => {

  return (
    <div>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header params={params} searchParams={searchParams} />
          <Form slug={params.reserve_slug} searchParams={searchParams} />
        </div>
      </div>
    </div>
  )
}

export default ReservationPage