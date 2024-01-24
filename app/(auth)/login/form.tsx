'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiLoginUser } from "@/lib/api-requests";
import Link from "next/link";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";

// export const Form = () => {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get('callbackUrl') || '/'
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

  // async function loginUser(credentials: { email: string; password: string }) {
  //   const res = await fetch('/api/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   }).then((res) => res.json())

  //   if (!res?.error) {
  //     router.push(callbackUrl)
  //   } else {
  //     setError('Invalid email or password')
  //   }
  // }

  // const onSubmitHandler = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   loginUser({ email, password })
  // };

  export default function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const store = useStore();
  
    useEffect(() => {
      store.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    async function LoginUserFunction(credentials: { email: string; password: string }) {
      store.setRequestLoading(true);
      try {
        await apiLoginUser(JSON.stringify(credentials));
  
        toast.success("Logged in successfully");
        return router.push("/profile");
      } catch (error: any) {
        console.log(error);
        if (error instanceof Error) {
          handleApiError(error);
        } else {
          toast.error(error.message);
          console.log("Error message:", error.message);
        }
      } finally {
        store.setRequestLoading(false);
      }
    }
  
    const onSubmitHandler = (e: React.FormEvent) => {
      e.preventDefault()
      LoginUserFunction({email, password});
    };
  

  return (
    <form onSubmit={onSubmitHandler} className="space-y-12 w-full sm:w-[400px]">
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
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {error && <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>BŁĄD</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        </Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Login
        </Button>
      </div>
    </form>
  )
}