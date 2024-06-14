import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../Error/Apperror';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);

    // check if the token is send from client side
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;
    // console.log(decoded);

    // check if the token is valid
    const { role, emailId } = decoded;

    const isUserExists = await User.isUserExists(emailId);

    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This User is not found !');
    }

    //
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
