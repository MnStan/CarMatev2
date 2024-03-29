"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { City, User } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import useStore from "@/store";
import { handleApiError } from '@/lib/helpers'
import { apiAddCar, apiAddPhotosInfo, apiGetAuthUser, apiUploadPhoto } from '@/lib/api-requests'
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from 'next/navigation'
import { error } from 'console'
import { DessertIcon } from 'lucide-react'
import { Alert } from '@/components/ui/alert'
import { Crete_Round } from 'next/font/google'
import { v4 as uuidv4 } from 'uuid'

export default function AddCarForm() {
  const [vehicleName, setVehicleName] = useState('')
  const [cities, setCities] = useState<City[]>();
  const [city, setCity] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('')
  const [avatar, setMainImage] = useState<File>()
  const [imageId, setImageId] = useState<string>('')
  const [directory_url, setDirectory] = useState<string>('')
  const [additional_images, setAdditionalImages] = useState<File[]>([])
  const [additionalName, setAdditionalName] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const store = useStore();
  const router = useRouter()

  async function AddCarFunction(credentials: { vehicleName: string; city: string, description: string, directory_url: string, avatar: string, user_id: string, car_info_id: string }) {
    store.setRequestLoading(true);
  
    try {
      await apiAddCar(JSON.stringify(credentials));

      toast.success("Added car successfully");
      return router.push("/");
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const additionalImagesInputRef = useRef<HTMLInputElement>(null)

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setMainImage(e.target.files[0]);
    }
  };
  
  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAdditionalImages(Array.from(e.target.files));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const user = store.authUser?.user_id;
  
    if (vehicleName === '') {
      setError("Proszę uzupełnić nazwę pojazdu");
      return;
    }
  
    if (city === null) {
      setError("Proszę wybrać miasto!");
      return;
    }
  
    if (user) {
      try {
        const directory = uuidv4();
        setDirectory(directory)
        const carInfoId = uuidv4()
  
        await AddCarFunction({
          vehicleName: vehicleName,
          city: city,
          description: description,
          directory_url: directory,
          avatar: "",
          user_id: user,
          car_info_id: carInfoId
        });

        if (avatar) {
          await uploadImage(avatar, carInfoId, directory);
        }
  
        for (const image of additional_images) {
          await uploadImage(image, carInfoId, directory);
        }
      } catch (error: any) {
        if (error instanceof Error) {
          handleApiError(error);
        } else {
          toast.error(error.message);
        }
      }
    } else {
      setError("Proszę wybrać miasto!");
    }
  };
  
  const uploadImage = async (image: File, carInfoId: string,  directory: string) => {
    const data = new FormData();
    const imageId = uuidv4();

    data.append('file', image);
    data.append('imageId', imageId);
    data.append('directory', directory)

    await apiAddPhotosInfo(JSON.stringify({ photo_id: imageId, car_info_id: carInfoId, photo_url: directory }))

    await apiUploadPhoto(data)
  };
  useEffect(() => {
    fetch("/api/cities")
      .then((response) => response.json())
      .then((data) => setCities(data.data))
      .catch((error) => console.error("Błąd podczas pobierania miast:", error));
  }, []);

  return (
    <form className="space-y-12 w-full sm:w-[400px]">
      <Button className="w-full" size="lg" type="button" onClick={() => mainImageInputRef.current?.click()}>
        <input
          ref={mainImageInputRef}
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          style={{ display: 'none' }}
        />
        DODAJ GŁÓWNE ZDJĘCIE
      </Button>
      {avatar && <Image src={URL.createObjectURL(avatar)} alt="Podgląd głównego zdjęcia" width={500} height={300} />}
      
      <Button className="w-full" size="lg" type="button" onClick={() => additionalImagesInputRef.current?.click()}>
        <input
          ref={additionalImagesInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleAdditionalImagesChange}
          style={{ display: 'none' }}
        />
        DODAJ ZDJĘCIA
      </Button>
      {additional_images.map((image, index) => (
        <Image key={index} src={URL.createObjectURL(image)} alt={`Podgląd zdjęcia ${index + 1}`} width={500} height={300} />
      ))}
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="vehicleName">Podaj nazwę pojazdu</Label>
        <Input 
          className="w-full"
          required 
          value={vehicleName} 
          onChange={(e) => setVehicleName(e.target.value)} 
          id="vehicleName" />
      </div>

      <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="city">Miasto</Label>
      <Select onValueChange={(value) => setCity(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Miasto" />
        </SelectTrigger>
        <SelectContent>
          {cities
            ? cities.map((city, index) => (
                <SelectItem key={index} value={city.city_id}>
                  {city.name}
                </SelectItem>
              ))
            : "Error"}
        </SelectContent>
      </Select>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Dodaj opis</Label>
        <textarea
          className="w-full h-[100px]"
          required 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          id="description" />
      </div>
      {error && <Alert>{error}</Alert>}
      <Button className="w-full" size="lg" type="button" onClick={handleSubmit}>
        DODAJ POJAZD
      </Button>
    </form>
  )
}