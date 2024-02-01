"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { apiGetCarData, apiGetImage } from '@/lib/api-requests'; 
import { CarData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function CarPage() {
  const [carData, setCarData] = useState<CarData | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [carId, setCarId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const router = useRouter();

  const pathname = usePathname()
  const searchParameters = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split('/');
      const id = pathParts[pathParts.length - 1];
      setCarId(id);
    }
  }, [pathname]);

  useEffect(() => {
    if (carId) {
      apiGetCarData(carId).then(data => {
        setCarData(data);
        const imagePath = data.photos[imageIndex].photo_url; 
        const photo_id = data.photos[imageIndex].photo_id;
        apiGetImage({ path: imagePath, photo_id: photo_id }).then(url => setImageUrl(url)); 
      });
    }
  }, [carId, imageIndex]);

  if (!carData) {
    return <div>Loading...</div>;
  }

  const carImages = carData.photos.map((photo: { photo_url: string }) => photo.photo_url);
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button onClick={() => setImageIndex((imageIndex - 1 + carImages.length) % carImages.length)}>
        POPRZEDNIE ZDJĘCIE
      </button>
      {imageUrl && <Image src={imageUrl} alt="Car Image" width={500} height={300} />}
      <button onClick={() => setImageIndex((imageIndex + 1) % carImages.length)}>
        NASTĘPNE ZDJĘCIE
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Właściciel</h2>
        <p>{carData.user_info.name}</p>
        <p>{carData.user_info.address}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Informacje o samochodzie</h2>
        <p>{carData.name}</p>
        <p>{carData.description}</p>
      </div>

      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        UMÓW JAZDĘ PRÓBNĄ
      </button>
    </div>
    <Footer />
    </>
  );
}
