'use client'
import { Trip } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import ptBR from 'date-fns/locale/pt-BR'
import Button from '@/components/Button/Button'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'

export default function TripConfirmation({
  params,
}: {
  params: { tripId: string }
}) {
  const [trip, setTrip] = useState<Trip | null>()
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { status, data } = useSession()
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
        }),
      })

      const res = await response.json()

      if (res?.error) {
        return router.push('/')
      }

      setTotalPrice(res.totalPrice)
      setTrip(res.trip)
    }

    if (status === 'unauthenticated') {
      router.push('/')
    }

    fetchTrip()
  }, [status, searchParams, params.tripId, router])

  const startDate = new Date(searchParams.get('startDate') as string)
  const endDate = new Date(searchParams.get('endDate') as string)
  const guests = searchParams.get('guests')

  if (!trip) return null

  async function handleBuyClick() {
    const res = await fetch('/api/payment', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
          guests: Number(searchParams.get('guests')),
          totalPrice,
          coverImage: trip?.coverImage,
          name: trip?.name,
          description: trip?.description,
        }),
      ),
    })

    if (!res.ok) {
      return toast.error('Ocorreu um erro ao tentar cadastrar uma viagem!')
    }

    const { sessionId } = await res.json()

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY as string,
    )

    await stripe?.redirectToCheckout({ sessionId })

    // router.push('/')

    toast.success('Reserva realizada com sucesso!', {
      position: 'bottom-center',
    })
  }

  return (
    <div className="container mx-auto p-5 h-screen">
      <h1 className="text-xl font-semibold text-primaryDarker">Sua viagem</h1>
      {/* CARD */}
      <div className="flex flex-col p-5 mt-5 border-solid border border-grayLighter rounded-lg shadow-md">
        <div className="flex items-center gap-3 border-b border-grayLighter border-solid pb-5">
          <div className="relative w-[124px] h-[106px]">
            <Image
              src={trip?.coverImage}
              alt={trip.name}
              fill
              style={{ backgroundImage: 'cover' }}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-primaryDarker font-semibold mt-5">
            Informações do preço
          </h3>

          <div className="flex justify-between items-center">
            <p className="text-primaryDarker text-sm font-normal">Total: </p>
            <p className="font-medium text-primaryDarker ">R${totalPrice}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <h3 className="text-primaryDarker font-semibold  text-sm">Data</h3>
        <div className="flex items-center gap-1">
          <p className="text-primaryDarker font-normal text-sm">
            {format(startDate, "dd 'de' MMMM ", { locale: ptBR })}
          </p>
          {' - '}
          <p className="text-primaryDarker font-normal text-sm">
            {format(endDate, "dd 'de' MMMM ", { locale: ptBR })}
          </p>
        </div>

        <h3 className="text-primaryDarker font-semibold mt-5">Hóspedes</h3>
        <p className="text-primaryDarker font-normal text-sm">
          {guests} hóspedes
        </p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}
