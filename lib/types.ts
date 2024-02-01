export interface FilteredUserInfo {
  name: string;
  surname: string;
  phone: string;
  address: string
}

export interface FilteredUser {
    user_id: string;
    email: string
}

export interface FilteredUserInformations {
  user: FilteredUser;
  userInfo: FilteredUserInfo;
}

export interface UserResponse {
    status: string;
    data: {
      user: FilteredUser;
      userInfo: FilteredUserInfo
    };
  }
  
  export interface UserLoginResponse {
    status: string;
    token: string;
    expiresIn: number;
  }
  
  interface City {
    city_id: number;
    name: string;
  }

export interface CarData {
    photos: { photo_url: string, photo_id: string }[];
    user_info: { name: string; address: string, phone: string };
    name: string;
    description: string;
  }