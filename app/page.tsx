import React, {useState, useEffect} from 'react';
import { api } from '@/lib/api';
import { PrintEndpoint } from '@/components';
import axios from 'axios';
import { LoginButton, LogoutButton } from './auth';
import { Button } from '@/components/ui/button';
import test from 'node:test';
import Header from '@/components/Header';



export default async function HomePage() {
  
  return (
    <><Header /><main>
      <LogoutButton />
      <LoginButton />
    </main></>
  )
}