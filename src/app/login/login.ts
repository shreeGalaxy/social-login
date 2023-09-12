export interface LoginReqParam {
  email: string;
  password: string;
}

//TODO need to revisit
export interface LoginData {
  userDetails: User;
}
export interface Message {
  message?: string;
}

export interface User {
  name?: string;
  email?: string;
  city?: string;
  place?: string;
  phoneNumber?: string;
  promotions?: string;
  gender?: string;
  profilePic?: string;
  token?: string;
  message?: string;
}

export interface UserInformation {
  city: string;
  email: string;
  gender: string;
  message: string;
  name: string;
  phoneNumber: string;
  place: string;
  profilePic: string | null | undefined;
  promotions: string;
}
