import * as jwt from 'jsonwebtoken';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  resolve() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'JWT') {
        const token = (req.headers.authorization as string).split(' ')[1];
        let decoded: any;

        try {
          decoded = jwt.verify(token, process.env.JWT_KEY || '');
        } catch (e) {
          throw new UnauthorizedException();
        }

        if (!decoded.session_id) {
          throw new UnauthorizedException();
        }
        req.user = decoded;
        next();
      } else {
        throw new UnauthorizedException();
      }
    };
  }
}