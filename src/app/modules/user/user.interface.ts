/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
};

export type TUserRole = keyof typeof USER_ROLE;

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;

  // isJwtIssuedBeforePasswordChange(
  //   passwordChangeTimestamp: Date,
  //   jwtIssuedTimeStamp: number,
  // ): boolean;
}
