import { ApiError } from '../errors';
import { Request } from 'express';
import catchAsync from './catchAsync';
import pick from './pick';
import config from '../../config/config'
import authLimiter from './rateLimiter';

function generateRandomAlphanumericWord(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
};

function extractSubdomain(url: string): string | null {
  const subdomainMatch = url.match(/^(?:https?:\/\/)?([^./]+)\./);
  if (subdomainMatch && subdomainMatch.length > 1) {
    return subdomainMatch[1] as any;
  }
  return null;
}

const checkRights = (role: string, url: string) => {
  let subdomain = extractSubdomain(url);
  if(subdomain !== null){
    if(role !== subdomain){
      throw new ApiError(401, `You're not a(n) ${subdomain}`)
    }
  } else if(role !== "user"){
    throw new ApiError(403, "You're not a user")
  };
};

const getCookieDomain = (req: Request) => {
  let url = req?.headers.referer;
  let subdomain = extractSubdomain(url as string);
  if(config.env === "development"){
    if(subdomain === "organizer"){
      return ".localhost:3000";
    } else if(subdomain === "guru") {
      return ".localhost:3000";
    } else {
      return "localhost"
    }
  } else {
    if(subdomain === "organizer"){
      return "organizer.trietix.com";
    } else if(subdomain === "guru") {
      return "guru.trietix.com";
    } else {
      return "trietix.com"
    }
  }
};

export { catchAsync, pick, authLimiter, getCookieDomain, generateRandomAlphanumericWord, checkRights };
