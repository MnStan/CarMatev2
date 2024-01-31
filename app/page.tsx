"use client"

import React, {useState, useEffect} from 'react';
import { PrintEndpoint } from '@/components';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/ui/search';

export default function HomePage() {
  
  return (
    <>
      <Header />
      <main>
        <SearchBar />
      </main>
      <Footer />
    </>
  )
}