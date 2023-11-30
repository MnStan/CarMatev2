"use client"
import React, {useState, useEffect} from 'react';
import { api } from '@/lib/api';
import { PrintEndpoint } from '@/components';
import axios from 'axios';
import { UserInfo } from '@/lib/data';

export async function getUserInfo(id: string) {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

export default function FirstUser() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo('1');
      setUserInfo(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {userInfo ? (
        <PrintEndpoint
            key={userInfo.user_info_id}
            user_info_id={userInfo.user_info_id}
            name={userInfo.name}
            surname={userInfo.surname}
            phone={userInfo.phone}
            address={userInfo.address}      
        />
      ) : (
        <p>Ładowanie danych użytkownika...</p>
      )}
    </div>
  );
}
