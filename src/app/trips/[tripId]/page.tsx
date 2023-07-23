import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { TripHeader } from './components/TripHeader/TripHeader'
import { TripReservation } from './components/TripReservation/TripReservation'
import { TripDescription } from './components/TripDescription/TripDescription'
import { TripHighlights } from './components/TripHighlights/TripHighlights'
import { TripLocation } from './components/TripLocation/TripLocation'

async function getTripsDetails(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  })

  return trip
}

export default async function TripDetails({
  params,
}: {
  params: { tripId: string }
}) {
  const trip = await getTripsDetails(params.tripId)

  if (!trip) return

  return (
    <div className="container mx-auto lg:px-40">
      <TripHeader trip={trip} />

      {/* Reserva */}
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripId={trip.id}
            maxGuests={trip.maxGuests}
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
            pricePerDay={trip.pricePerDay as any}
          />
        </div>

        {/* Descrição da viagem */}

        <div className="lg:order-1">
          <TripDescription description={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  )
}
