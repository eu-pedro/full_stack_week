'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TripReservation } from "@prisma/client"

export default function MyTrips () {
  const [reservations, setReservations] = useState<TripReservation[]>([])
  const { status, data } = useSession()


  const router = useRouter()

  useEffect(() => {
     if(status === 'unauthenticated') {
       router.push('/')
     }

    const fetchReservations = async ()  => {
      const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`)

      const json = await response.json()
      setReservations(json)
    }
    fetchReservations()
  }, [status])
  
  console.log({reservations})


  return <h1>my trips </h1>
}