type UserDatil = {
  age: number;
  country: string;
};

export type Userinf = {
  email: string;
  emailConfirmed: boolean;
  id: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  userDatil: UserDatil;
  userName: string;
};
