import { prisma } from "@/lib/prisma"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"
import { TripHeader } from "./components/TripHeader/TripHeader"
import { TripReservation } from "./components/TripReservation/TripReservation"

async function getTripsDetails (tripId: string){
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    }
  })

  return trip
}

export default async function TripDetails ({ params }: { params: { tripId: string}} ) {

  const trip = await getTripsDetails(params.tripId)

  if(!trip) return

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip}/>


      {/* Reserva */}
      <TripReservation trip={trip}/>
    </div>  
  )
} 