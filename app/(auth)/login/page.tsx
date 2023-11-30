import Link from 'next/link'
import { Form as LoginForm } from './form'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100">
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
      <div className="w-1/2 p-12 flex items-center justify-center">
      </div>
    </div>
  )
}