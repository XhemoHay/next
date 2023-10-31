import { notFound } from 'next/navigation'
import React from 'react'


async function getData(id) {
     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
          { cache: 'force-cache' }
     )
     if (!res.ok) {
         return notFound()
     }
     return res.json()
}

const Student = async({params}) => {
   
     const data = await getData(params.id)

  return (
    <div>{data.title}</div>
  )
}

export default Student