import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddCarForm from './form'

export default function AddCarPage() {
  return (
    <div className='flex flex-col min-h-screen'>
    <Header />
    <div className="flex flex-col">
        <div className=" w-screen flex flex-col items-center justify-center bg-slate-100">
        <div className="sm:shadow-xl px-8 pb-8 pt-12 bg-gray-400 rounded-xl space-y-12">
        <h1 className="font-semibold text-4xl text-center mt-12 mb-32">Dodaj ogłoszenie</h1>
        <AddCarForm />
      </div>
    </div>
    </div>
    <Footer />
    </div>
  )
}