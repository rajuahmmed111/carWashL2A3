import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../Error/Apperror';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { cerateToken } from './user.utiles';

const createSignIn = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUser) => {
  // console.log(payload);
  const user = await User.isUserExists(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is not found !');
  }

  // checked if the password is correct
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match!');
  }

  // Access Granted: send access token and refresh token
  // create token and send client side
  const jwtPayload = {
    userId: user.email,
    role: user.role,
  };

  // access token
  const accessToken = cerateToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  // refresh token
  const refreshToken = cerateToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  // check if the token is valid
  const { userId } = decoded;

  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is not found !');
  }

  const jwtPayload = {
    userId: isUserExists.email,
    role: isUserExists.role,
  };

  // access token
  const accessToken = cerateToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const UserServices = {
  createSignIn,
  loginUser,
  refreshToken,
};
