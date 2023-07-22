'use client'
import { TripItem } from "@/components/TripItem/TripItem"
import { Trip } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface GetTripsParams {
  text: string
  starDate: Date | null
  budget?: string
}

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(`/api/trips/search?text=${searchParams.get('text') ?? ""}&starDate=${searchParams.get('starDate')}&budget=${searchParams.get('budget')}`)

      console.log(response)
      const data = await response.json();
      console.log(data)
      setTrips(data)
    }

    fetchTrips()
  }, [])


  return (
    <div className="container mx-auto flex flex-col p-5 items-center">
      <h1 className="primaryDarker font-semibold text-xl">{!!trips.length ? 'Hospedagens Encontradas' : 'Não encontramos nenhuma viagem! =('}</h1>
      <h2 className="text-grayPrimary font-medium mb-5">Listamos as melhores viagens para você!</h2>

      <div className="flex flex-col gap-4">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}