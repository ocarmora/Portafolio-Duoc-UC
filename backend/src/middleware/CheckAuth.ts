import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  if(request.path == '/api/auth/login'){
    next();
  }else{
    try {
      const token = request.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      next();
    } catch {
      return response.status(401).json({
        message: 'Authorization bearer header not found'
      });
    }
  }
}
