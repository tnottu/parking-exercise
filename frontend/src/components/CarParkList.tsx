import React, { useState, useEffect } from 'react'
import { ALL_CARPARKS } from '../queries/carParks'
import { useQuery } from '@apollo/client'

interface CarParkEntry {
  carParkId: string,
  name: string,
  lat?: number,
  lon?: number,
  maxCapacity?: number,
  spacesAvailable?: number,
}

const CarParkList: React.FC = () => {
  const [carParks, setCarParks] = useState<CarParkEntry[]>([]);
  const carParksQuery = useQuery(ALL_CARPARKS)
  const carParksValid = carParks.filter((item) => {
    return item.spacesAvailable !== null
  })

  const carParksToShow = carParksValid;

  useEffect(() => {
    if (carParksQuery.data) {
      setCarParks(carParksQuery.data.carParks)
    }
  }, [carParksQuery])

  return <div>
    {carParksToShow.map((item: CarParkEntry) => (
      <article key={item.carParkId}>
        {item.name}, {item.spacesAvailable}/{item.maxCapacity || '?'}
      </article>
    ))}
  </div>
}

export default CarParkList;
