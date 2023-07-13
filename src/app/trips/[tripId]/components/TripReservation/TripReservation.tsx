'use client'
import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Input from "@/components/Input/Input";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  trip: Trip
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export function TripReservation({ trip }: TripReservationProps) {

  const { handleSubmit ,register, formState: { errors }, control } = useForm<TripReservationForm>()
  
  const onSubmit = (data) => {
    console.log({ data })
  }

  return (
    <div>
      <div className="flex flex-col px-5">
        <div className="flex gap-4">
          <Controller 
            name="startDate"
            rules={{
              required: {
                value: true,
                message: 'Data inicial é obrigatória'
              }
            }}
            control={control}
            render={({ field }) => (

            <DatePicker 
              error={!!errors?.startDate}
              errorMessage={errors.startDate?.message}
              placeholderText="Data de início" 
              onChange={field.onChange} 
              selected={field.value}
              className="w-full"
            />
            )}
          />

          <Controller 
            name="endDate"
            rules={{
              required: {
                value: true,
                message: 'Data final é obrigatória'
              }
            }}
            control={control}
            render={({ field }) => (

            <DatePicker 
              error={!!errors?.endDate}
              errorMessage={errors.endDate?.message}
              placeholderText="Data Final" 
              onChange={field.onChange} 
              selected={field.value}
              className="w-full"
            />
            )}
          />
        </div>

        <Input 
          {...register('guests', {
            required: {
              value: true,
              message: 'Número de hóspedes é obrigatório'
            }
          })}
          error={!!errors.guests}
          errorMessage={errors?.guests?.message}
          placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`} 
          className="mt-4" 
        />

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>
          <p className="font-medium text-sm text-primaryDarker">R$2.660</p>
        </div>

        <div className="pb-10 border-b border-b-grayLighter w-full">
         <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full">Reservar agora</Button>
        </div>
      </div>
    </div>
  )
}