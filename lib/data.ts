import axios from 'axios';

export interface UserInfo {
  user_info_id: number;
  name: string;
  surname: string;
  phone: string;
  address: string;
}