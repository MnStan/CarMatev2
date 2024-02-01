import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface CarComponentProps {
  apiEndpoint: string;
  label: string;
  href: string; // Dodajemy nową właściwość do naszych propsów
}

interface CarData {
  imageUrl: string;
  label: string;
}

const CarComponent: React.FC<CarComponentProps> = ({ apiEndpoint, label, href }) => {
  const [carData, setCarData] = useState<CarData | null>(null);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setCarData({ imageUrl, label: label });
      })
      .catch(error => console.error('Error:', error));
  }, [apiEndpoint, label]);

  if (!carData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center py-2">
      <div className="bg-gray-200 rounded-xl p-5 w-full max-w-sm sm:w-2/3 md:max-w-2/3 lg:max-w-xl h-64 flex flex-col items-center justify-center">
        <Link href={href} className='contents'>
          <Image src={carData.imageUrl} alt={carData.label} width={160} height={90} className="w-full h-full object-contain"/>
        </Link>
        <p className="mt-2 text-center">{label}</p>
      </div>
    </div>
  )
}

export default CarComponent
