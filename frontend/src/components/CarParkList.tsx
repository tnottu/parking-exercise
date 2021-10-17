import React, { useState } from 'react'

interface CarParkEntry {
  carParkId: string,
  name: string,
  lat?: number,
  lon?: number,
  maxCapacity?: number,
  spacesAvailable?: number,
}

const testData: CarParkEntry[] = [
  {
    carParkId: '123',
    name: 'Testipaikka',
    lat: 0,
    lon: 0,
    maxCapacity: 10,
    spacesAvailable: 6,
  }
];

const CarParkList: React.FC = () => {
  const [carParks, setCarParks] = useState<CarParkEntry[]>(testData);

  return <div>
    {carParks.map((item: CarParkEntry) => (
      <article key={item.carParkId}>
        {item.name}, {item.spacesAvailable}/{item.maxCapacity || '?'}
      </article>
    ))}
  </div>
}

export default CarParkList;
