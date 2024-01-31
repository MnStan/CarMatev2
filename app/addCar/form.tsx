"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { City } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function AddCarForm() {
  const [vehicleName, setVehicleName] = useState('')
  const [cities, setCities] = useState<City[]>();
  const [city, setCity] = useState<number | null>(null);
  const [description, setDescription] = useState('')
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    // Obsługa logiki przesyłania tutaj
  }

  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const additionalImagesInputRef = useRef<HTMLInputElement>(null)

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setMainImage(e.target.files[0])
    }
  }

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAdditionalImages(Array.from(e.target.files))
    }
  }

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
      {mainImage && <Image src={URL.createObjectURL(mainImage)} alt="Podgląd głównego zdjęcia" width={500} height={300} />}
      
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
      {additionalImages.map((image, index) => (
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
      <Select onValueChange={(value) => setCity(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Miasto" />
        </SelectTrigger>
        <SelectContent>
          {cities
            ? cities.map((city, index) => (
                <SelectItem key={index} value={city.city_id.toString()}>
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

      <Button className="w-full" size="lg">
        DODAJ POJAZD
      </Button>
    </form>
  )
}
