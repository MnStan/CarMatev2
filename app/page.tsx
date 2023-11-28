import React, {useState, useEffect} from 'react';
import { api } from '@/lib/api';
import { PrintEndpoint } from '@/components';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { LoginButton, LogoutButton } from './auth';


export default async function HomePage() {
  const session = await getServerSession(authOptions)


  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <div>HomePage</div>
      <pre>{JSON.stringify(session)}</pre>
    </main>
  )
}