"use client"

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/ui/search';
import CarComponent from '@/components/CarCard';

interface Car {
  car_id: string;
  name: string;
  photos: { photo_id: string, photo_url: string }[];
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState<string>('');

  const filteredCars = cars.filter(car => 
  car.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios.get('/api/getAllCars')
      .then(response => {
        if (response.data.status === 'success') {
          setCars(response.data.data);
        }
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych', error);
      });
  }, []);


  return (
    <>
      <Header />
      <SearchBar onSearch={setSearch} />
      {filteredCars.map(car => (
        <CarComponent 
          key={car.car_id} 
          apiEndpoint={`/api/image/${car.photos[0]?.photo_url}/${car.photos[0]?.photo_id}`} 
          label={car.name} 
          href={`/car/${car.car_id}`}
        />
      ))}
      <Footer />
    </>
  )
      }