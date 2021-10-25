interface Props {
  carParks: CarParkEntry[];
}

const CarParkList = ({ carParks }: Props) => {
  return (
    <section>
      <header className="flex justify-between items-center p-4">
        <div>Carpark</div>
        <div className="text-xs px-4">
          <strong>Available spaces</strong>{' '}
          <span className="text-gray-500">/ total</span>
        </div>
      </header>
      <div className="m-4 mt-0 bg-white border border-gray-400 shadow-md rounded flex flex-col divide-y divide-gray-300">
        {carParks.map((item: CarParkEntry) => (
          <article
            key={item.carParkId}
            className="py-2 px-4 flex justify-between"
          >
            <div>{item.name}</div>
            <div>
              <span className="text-xs bg-blue-200 rounded-full py-1 px-2">
                <strong>{item.spacesAvailable}</strong>{' '}
                <span className="text-blue-500">
                  / {item.maxCapacity || '?'}
                </span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CarParkList;
