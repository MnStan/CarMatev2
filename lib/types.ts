export interface FilteredUser {
    user_id: string;
    name: string;
    email: string
}

export interface UserResponse {
    status: string;
    data: {
      user: FilteredUser;
    };
  }
  
  export interface UserLoginResponse {
    status: string;
    token: string;
  }
  