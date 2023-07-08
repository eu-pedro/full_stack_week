'use client'

import { useEffect, useState } from "react"

export function Trips () {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then((data) => data.json()).then((data) => setData(data))
  }, [])
  return (
    <div>
      {data.map((post:any) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  )
}