import {AuthController} from "./controller/AuthController";
import { UsuarioController } from "./controller/UsuarioController";

export const Routes = [
  // Auth route: login
  {
    method: "post",
    route: "auth/login",
    controller: AuthController,
    action: "login"
  },
  // Auth route: currentUser
  {
    method: "post",
    route: "auth/current",
    controller: AuthController,
    action: "currentUser"
  },
  // Auth route: validateToken
  {
    method: "post",
    route: "auth/validate",
    controller: AuthController,
    action: "validateToken"
  },
  // User CRUD routes
  {
    method: "get",
    route: "users/:id",
    controller: UsuarioController,
    action: "one"
  }
];
