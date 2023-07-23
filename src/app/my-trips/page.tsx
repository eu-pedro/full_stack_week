'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Prisma, TripReservation } from '@prisma/client'
import { UserReservationItem } from './components/UserReservationItem'
import Link from 'next/link'
import Button from '@/components/Button/Button'

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true }
    }>[]
  >([])
  const { status, data } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `/api/user/${(data?.user as any)?.id}/reservations`,
      )

      const json = await response.json()
      setReservations(json)
    }
    fetchReservations()
  }, [status, data?.user, router])

  return (
    <div className="contaner mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas Viagens
      </h1>
      {reservations.length > 0 ? (
        reservations?.map((reservation) => (
          <UserReservationItem reservation={reservation} key={reservation.id} />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="mt-2 font-medium text-primaryDarker">
            Você não tem nenhuma reserva
          </p>

          <Link href="/">
            <Button className="w-full mt-2">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
