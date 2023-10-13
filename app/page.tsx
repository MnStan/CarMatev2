"use client"
import React, {useState, useEffect} from 'react';
import { AxiomAnnouncements, Announcement } from '@/lib/data';
import { api } from '@/lib/api';
import { PrintEndpoint } from '@/components';

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>();

  useEffect(() => {
    api.get<AxiomAnnouncements>('/api/announcements').then((response) => {
      console.log(response.data);
      console.log(response.status)
      setAnnouncements(response.data.announcements)
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <main>
      {
        announcements ? announcements.map(announcement => {
          return (
            <PrintEndpoint
            key={announcement.id}
            id={announcement.id}
            title={announcement.title}
            desc={announcement.desc}
            />
          )
        }) : ''
      }
    </main>
  )
}