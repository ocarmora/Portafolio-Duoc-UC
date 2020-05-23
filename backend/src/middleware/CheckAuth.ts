import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  if(request.path == '/api/login'){
    next();
  }else{
    try {
      const token = request.headers.authorization.split(" ")[1];
      jwt.verify(token, "jVVZgzfNc2Ho38JQxb5GsrlKXILuW1DkEJI8dJC7CsiqyQWj2zMIHX387pUgv9oMG95PNdcN4EDG1RsEYCrccmQgIX");
      next();
    } catch {
      return response.send(false);
    }
  }
}
