import Button from '@/components/Button/Button'
import { Prisma, TripReservation } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>
}

export function UserReservationItem({ reservation }: UserReservationItemProps) {
  const { trip } = reservation
  const router = useRouter()

  async function handleDeleteClick() {
    const response = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao cancelar a reserva')
    }

    toast.success('Reserva cancelada com sucesso!', {
      position: 'bottom-center',
    })

    router.refresh()
  }

  return (
    <div>
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
            <h2 className="text-xl text-primaryDarker">{trip.name}</h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5">
          <h3 className="text-sm">Data</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm">
              {format(new Date(reservation.endDate), "dd 'de' MMMM ", {
                locale: ptBR,
              })}
            </p>
            {' - '}
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd 'de' MMMM ", {
                locale: ptBR,
              })}
            </p>
          </div>

          <h3 className=" mt-5">Hóspedes</h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="text-primaryDarker font-semibold mt-3 pt-5 border-t border-solid border-grayLighter">
            Informações do preço
          </h3>

          <div className="flex justify-between items-center">
            <p className="text-sm font-normal mt-2">Total: </p>
            <p className="font-medium text-sm">
              R${Number(reservation.totalPaid)}
            </p>
          </div>

          <Button variant="danger" className="mt-5" onClick={handleDeleteClick}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
