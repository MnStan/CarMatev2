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
import { Button } from '@/components/ui/button';
import Modal from 'react-modal';

export default function CarPage() {
  const [carData, setCarData] = useState<CarData | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [carId, setCarId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); 

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

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
        if (data.photos && data.photos[imageIndex]) {
          const imagePath = data.photos[imageIndex].photo_url; 
          const photo_id = data.photos[imageIndex].photo_id;
          apiGetImage({ path: imagePath, photo_id: photo_id }).then(url => setImageUrl(url)); 
        }
      });
    }
  }, [carId, imageIndex]);

  if (!carData) {
    return <div>Loading...</div>;
  }

  const carImages = carData.photos.map((photo: { photo_url: string }) => photo.photo_url);
  return (
    <div className='flex flex-col min-h-screen'>
    <Header />
    <div className="flex flex-col items-center justify-center py-2">
      <div className="bg-gray-200 rounded-xl p-5 w-full max-w-sm sm:w-2/3 md:max-w-2/3 lg:max-w-xl flex flex-col items-center">
        {imageUrl && <Image src={imageUrl} alt="Car Image" width={500} height={300} className="w-full h-full object-contain mb-4"/>}
        {carImages.length > 1 && (
          <div className="flex justify-center space-x-4 mb-4">
            <Button variant="default" size="sm" onClick={() => setImageIndex((imageIndex - 1 + carImages.length) % carImages.length)}>
              POPRZEDNIE
            </Button>
            <Button variant="default" size="sm" onClick={() => setImageIndex((imageIndex + 1) % carImages.length)}>
              NASTĘPNE
            </Button>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-xl font-bold">Informacje o samochodzie</h2>
          <p>{carData.name}</p>
          <p>{carData.description}</p>
        </div>

        <Button variant="outline" size="default" className="mt-4 self-center" onClick={openModal}>
          UMÓW JAZDĘ PRÓBNĄ
        </Button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Umów jazdę próbną"
          ariaHideApp={false}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '50%',
              height: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
  <div className="bg-white p-4 rounded-md shadow-lg flex flex-col justify-center h-3/4">
    <h2 className="text-xl font-bold mb-2">Informacje o właścicielu</h2>
    <p><strong>Imię:</strong> {carData.user_info.name}</p>
    <p><strong>Adres:</strong> {carData.user_info.address}</p>
    <p><strong>Telefon:</strong> {carData.user_info.phone}</p>
    <Button variant="outline" size="lg" className="mt-4 self-center" onClick={closeModal}>
      Zamknij
    </Button>
  </div>
</Modal>
      </div>
    </div>
    <Footer />
    </div>
  );
}
