import React from 'react'
import { UserInfo } from '@/lib/data'

const PrintEndpoint = ({user_info_id, name, surname, phone, address}: UserInfo) => {
    return (
      <div className="m-5 p-5 bg-gray-300 w-auto lg:w-1/2 flex justify-center" key={1}>
        <h2>id: {user_info_id}</h2>
        <h2>name: {name}</h2>
        <h2>surname: {surname}</h2>
      </div>
    )
  }
  
  export default PrintEndpoint