import React, {useState, useEffect} from 'react';
import { api } from '@/lib/api';
import { PrintEndpoint } from '@/components';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { LoginButton, LogoutButton } from './auth';
import { Button } from '@/components/ui/button';
import test from 'node:test';



export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
    <LogoutButton />
    <h2>Server Session</h2>
    <pre>{JSON.stringify(session)}</pre>
    <h2>Client Call</h2>
  </main>
  )
}