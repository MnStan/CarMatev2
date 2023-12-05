"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { date } from "zod";
import { useRouter, useSearchParams } from 'next/navigation'

interface City {
  city_id: number;
  name: string;
}

export const RegisterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [cities, setCities] = useState<City[]>();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [city, setCity] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cities")
      .then((response) => response.json())
      .then((data) => setCities(data.data))
      .catch((error) => console.error("Błąd podczas pobierania miast:", error));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (city === null) {
      setError(("Proszę wybrać miasto!"))
      return
    }

    if (password != repeatPassword) {
      setError("Podane hasła nie są takie same!")
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          phone,
          city,
          address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        router.push(callbackUrl)
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Imię</Label>
        <Input
          className="w-full"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="surname">Nazwisko</Label>
        <Input
          className="w-full"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          id="surname"
          type="text"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Hasło</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Powtórz hasło</Label>
        <Input
          className="w-full"
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="phone">Numer telefonu</Label>
        <Input
          className="w-full"
          required
          value={phone}
          onChange={(e) => setPhoneNumber(e.target.value)}
          id="phone"
          type="tel"
          pattern="^[0-9]{9}$"
        />
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
        <Label htmlFor="address">Adres</Label>
        <Input
          className="w-full"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          type="text"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Register
        </Button>
      </div>
    </form>
  );
};
