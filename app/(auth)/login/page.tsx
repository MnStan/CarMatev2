import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Header from "@/components/Header";
import Head from 'next/head';
import LoginForm from './form';

export default function LoginPage() {
  return (
    <><Header /><div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 bg-gray-400 rounded-xl space-y-12">
        <h1 className="font-semibold text-4xl text-center mt-12 mb-32">Logowanie</h1>
        <LoginForm />
        <p className="text-center">
          Nie masz konta?{' '}
          <Link className="text-indigo-500 hover:underline" href="/register">
            Stwórz konto
          </Link>{' '}
        </p>
      </div>
    </div></>
  )
}