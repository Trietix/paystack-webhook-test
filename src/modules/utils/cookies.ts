import { CookieOptions } from 'express';
import config from '../../config/config';

export const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.jwt.accessExpirationMinutes * 60 * 1000
  ),
  maxAge: config.jwt.accessExpirationMinutes * 60 * 1000,
  httpOnly: true,
  path: '/',
  domain: config.env === "development" ? '.localhost' : '.trietix.com',
  secure: config.env === "development" ? false: true,
  sameSite: config.env === "development" ? 'lax' : 'none'
};

export const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ),
  maxAge: 30 * 24 *60 * 60 * 1000,
  httpOnly: true,
  path: '/',
  domain: config.env === "development" ? '.localhost' : '.trietix.com',
  secure: config.env === "development" ? false: true,
  sameSite: config.env === "development" ? 'lax' : 'none'
};