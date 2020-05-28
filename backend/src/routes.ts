import {AuthController} from "./controller/AuthController";
import { UsuarioController } from "./controller/UsuarioController";
import { ProductCategoryController } from "./controller/ProductCategoryController";

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
  },
  // Product Caregory CRUD routes
  {
    method: "get",
    route: "products/categories",
    controller: ProductCategoryController,
    action: "all"
  },
  {
    method: "post",
    route: "products/categories",
    controller: ProductCategoryController,
    action: "save"
  },
  {
    method: "delete",
    route: "products/categories/:id",
    controller: ProductCategoryController,
    action: "delete"
  },
  {
    method: "get",
    route: "products/categories/:id",
    controller: ProductCategoryController,
    action: "one"
  },
  {
    method: "patch",
    route: "products/categories/:id",
    controller: ProductCategoryController,
    action: "update"
  }
];
