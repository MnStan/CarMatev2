"use client"

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/ui/search';
import CarComponent from '@/components/CarCard';

interface Car {
  name: string;
  photos: { photo_id: string, photo_url: string }[];
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);

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
      <SearchBar />
      {cars.map(car => (
        car.photos.map(photo => (
          <CarComponent key={photo.photo_id} apiEndpoint={`/api/image/${photo.photo_url}/${photo.photo_id}`} label={car.name}/>
        ))
      ))}
      <Footer />
    </>
  )
}
