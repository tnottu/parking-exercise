import React, { useState, useEffect } from 'react'
import { ALL_CARPARKS } from './queries/carParks'
import { useQuery } from '@apollo/client'
import './App.css';
import CarParkList from './components/CarParkList/CarParkList';
import CarParkMap from './components/CarParkMap/CarParkMap';

const prepareCarParks = (carParks:CarParkEntry[]): CarParkEntry[] => {
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

  return carParksToShow
}

function App() {

  const [carParks, setCarParks] = useState<CarParkEntry[]>([]);
  const carParksQuery = useQuery(ALL_CARPARKS)
  const carParksToShow = prepareCarParks(carParks)

  useEffect(() => {
    if (carParksQuery.data) {
      setCarParks(carParksQuery.data.carParks)
    }
  }, [carParksQuery])

  return (
    <div className="App">
      <div className="TopBar row-start-1 bg-white p-4 shadow-md border-b border-gray-400 z-20">
        <h1 className="text-lg font-bold">Oulu Carparks Availability</h1>
      </div>
      <div className="row-start-3 lg:row-start-2">
        <CarParkList carParks={carParksToShow} />
      </div>
      <div className="row-start-2 lg:row-start-1 lg:row-span-2 h-64 lg:h-auto lg:min-h-screen z-10 border-b border-gray-400 lg:border-b-0 lg:border-l">
        <CarParkMap carParks={carParksToShow} />
      </div>
    </div>
  );
}

export default App;
