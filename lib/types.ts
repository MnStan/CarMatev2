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
  