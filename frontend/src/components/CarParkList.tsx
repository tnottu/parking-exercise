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
  const carParksUnique = carParksValid
    .filter((item, index, array) => {
      return array.findIndex(it => it.name === item.name) === index
    });
  const carParksSorted = carParksUnique.sort((a, b) => {
    if ( Number(a.spacesAvailable) < Number(b.spacesAvailable) ) return 1
    if ( Number(a.spacesAvailable) > Number(b.spacesAvailable) ) return -1
    return 0
  })

  const carParksToShow = carParksSorted;

  useEffect(() => {
    if (carParksQuery.data) {
      setCarParks(carParksQuery.data.carParks)
    }
  }, [carParksQuery])

  return <div className="m-4 bg-white border border-gray-400 rounded flex flex-col divide-y divide-gray-300">
    {carParksToShow.map((item: CarParkEntry) => (
      <article key={item.carParkId} className="py-2 px-4 flex justify-between">
        <div>
          {item.name}
        </div>
        <div>
          <span className="text-xs bg-blue-200 rounded-full py-1 px-2">
            <strong>{item.spacesAvailable}</strong> <span className="text-blue-500">/ {item.maxCapacity || '?'}</span>
          </span>
        </div>
      </article>
    ))}
  </div>
}

export default CarParkList;
