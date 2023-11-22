import React from 'react'
import {User} from '@/lib/data'

const PrintEndpoint = ({id, email}: User) => {
    return (
      <div className="m-5 p-5 bg-gray-300 w-auto lg:w-1/2 flex justify-center" key={1}>
        <h2>id: {id}</h2>
        <h2>title: {email}</h2>
      </div>
    )
  }
  
  export default PrintEndpoint