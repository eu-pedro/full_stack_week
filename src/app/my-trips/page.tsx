'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Prisma, TripReservation } from "@prisma/client"
import { UserReservationItem } from "./components/UserReservationItem"


export default function MyTrips() {
  const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>[]>([])
  const { status, data } = useSession()


  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }

    const fetchReservations = async () => {
      const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`)

      const json = await response.json()
      setReservations(json)
    }
    fetchReservations()
  }, [status])

  console.log({ reservations })


  return (
    <div className="contaner mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">Minhas Viagens</h1>
      {reservations?.map((reservation) => (
        <UserReservationItem reservation={reservation} key={reservation.id} />
      ))}
    </div>
  )
}