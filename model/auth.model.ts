export interface IUSer {
  _id?: string
  username?: string | null;
  phone: string;
  role?: string;
  address?: string | null;
  avatar?: string | null;
  active?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IInfoAccount {
  maxMoney: number;
  maxSquare: number;
  minMoney: number;
  minSquare: number;
}

export interface IAuthSlide {
  auth: boolean;
  user: IUSer | null;
  infoAccout: IInfoAccount | null;
  favorite: number,
  checkChangeUser?: number
  changeFavorite?: number
}
