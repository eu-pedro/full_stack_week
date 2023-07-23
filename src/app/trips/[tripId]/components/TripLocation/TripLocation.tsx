import Button from '@/components/Button/Button'
import Image from 'next/image'

interface TripLocationProps {
  location: string
  locationDescription: string
}

export function TripLocation({
  location,
  locationDescription,
}: TripLocationProps) {
  return (
    <div className="p-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Destaques</h2>
      <div className="relative h-[280px] w-full mb-5">
        <Image
          src="/map-mobile.png"
          alt=""
          fill
          style={{
            objectFit: 'cover',
          }}
          className="rounded-lg shadow-md"
        />
      </div>
      <p className="primaryDarker text-sm font-semibold mt-3">{location}</p>

      <p className="text-xs text-primaryDarker mt-3 leading-5">
        {locationDescription}
      </p>
      <Button variant="outlined" className="w-full mt-5">
        Ver no Google Maps
      </Button>
    </div>
  )
}
