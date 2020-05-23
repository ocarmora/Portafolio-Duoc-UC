import {UserController} from "./controller/UserController";
import {AuthController} from "./controller/AuthController";
import { ProductCategoryController } from "./controller/ProductCategoryController";
import { ProductController } from "./controller/ProductController";
import { ProviderUserController } from "./controller/ProviderUserController";

export const Routes = [
  { // Auth route: login
    method: "post",
    route: "login",
    controller: AuthController,
    action: "login"
  },
  { // Auth route: checkToken
    method: "post",
    route: "validateToken",
    controller: AuthController,
    action: "validateToken"
  },
  { // Auth route: decodeUser
    method: "post",
    route: "currentUser",
    controller: AuthController,
    action: "currentUser"
  },
  // Product category API routes
  {
    method: "get",
    route: "product/category",
    controller: ProductCategoryController,
    action: "all"
  },
  {
    method: "get",
    route: "product/category/:id",
    controller: ProductCategoryController,
    action: "one"
  },
  {
    method: "post",
    route: "product/category",
    controller: ProductCategoryController,
    action: "save"
  },
  {
    method: "delete",
    route: "product/category/:id",
    controller: ProductCategoryController,
    action: "remove"
  },
  {
    method: "put",
    route: "product/category/:id",
    controller: ProductCategoryController,
    action: "update"
  },
  // Product API routes
  {
    method: "get",
    route: "product",
    controller: ProductController,
    action: "all"
  },
  {
    method: "get",
    route: "product/:id",
    controller: ProductController,
    action: "one"
  },
  {
    method: "post",
    route: "product",
    controller: ProductController,
    action: "save"
  },
  {
    method: "delete",
    route: "product/:id",
    controller: ProductController,
    action: "remove"
  },
  {
    method: "put",
    route: "product/:id",
    controller: ProductController,
    action: "update"
  },
  // User API routes
  {
    method: "get",
    route: "user/provider",
    controller: ProviderUserController,
    action: "all"
  },
];
