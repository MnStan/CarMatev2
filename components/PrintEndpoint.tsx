import React from 'react'
import {Announcement} from '@/lib/data'

const PrintEndpoint = ({id, title, desc}: Announcement) => {
    return (
      <div className="m-5 p-5 bg-gray-300 w-auto lg:w-1/2 flex justify-center" key={id}>
        <h2>id: {id}</h2>
        <h2>title: {title}</h2>
        <h2>desc: {desc}</h2>
      </div>
    )
  }
  
  export default PrintEndpoint