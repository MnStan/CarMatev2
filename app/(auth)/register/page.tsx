import Link from 'next/link'
import { RegisterForm } from './form'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RegisterPage() {
  return (
    <>
    <Header />
    <div className="flex flex-col">
        <div className=" w-screen flex flex-col items-center justify-center bg-slate-100">
        <div className="sm:shadow-xl px-8 pb-8 pt-12 bg-gray-400 rounded-xl space-y-12">
        <h1 className="font-semibold text-4xl text-center mt-12 mb-32">Rejestracja</h1>
        <RegisterForm />
        <p className="text-center">
          Masz już konto?{' '}
          <Link className="text-indigo-500 hover:underline" href="/login">
            Zaloguj
          </Link>{' '}
        </p>
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}