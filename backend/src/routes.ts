import {AuthController} from "./controller/AuthController";
import { UsuarioController } from "./controller/UsuarioController";
import { ProductCategoryController } from "./controller/ProductCategoryController";
import { ProductController } from "./controller/ProductController";
import { OrderController } from "./controller/OrderController";
import { PaymentMethodController } from "./controller/PaymentMethodController";
import { BusinessController } from "./controller/BusinessController";
import { InventoryController } from "./controller/InventoryController";

export const Routes = [
  // Auth route: login
  {
    method: "get",
    route: "business/detail",
    controller: BusinessController,
    action: "detail"
  },
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
    // Provider users
    method: "get",
    route: "users/providers",
    controller: UsuarioController,
    action: "getProviderUsers"
  },
  {
    method: "get",
    route: "users/:id",
    controller: UsuarioController,
    action: "one"
  },
  // Product Category CRUD routes
  {
    method: "get",
    route: "products/categories/",
    controller: ProductCategoryController,
    action: "all"
  },
  {
    method: "post",
    route: "products/categories/",
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
  },
  // Product CRUD routes
  {
    method: "get",
    route: "products",
    controller: ProductController,
    action: "all"
  },
  {
    method: "post",
    route: "products",
    controller: ProductController,
    action: "save"
  },
  {
    method: "delete",
    route: "products/:id",
    controller: ProductController,
    action: "delete"
  },
  {
    method: "get",
    route: "products/:id",
    controller: ProductController,
    action: "one"
  },
  {
    method: "patch",
    route: "products/:id",
    controller: ProductController,
    action: "update"
  },
  {
    method: "get",
    route: "products/provider/:id",
    controller: ProductController,
    action: "productsByProvider"
  },
  // Order CRUD routes
  {
    method: "post",
    route: "orders",
    controller: OrderController,
    action: "save"
  },
  {
    method: "get",
    route: "orders",
    controller: OrderController,
    action: "getAll"
  },
  {
    method: "delete",
    route: "orders/:id",
    controller: OrderController,
    action: "remove"
  },
  {
    method: "get",
    route: "orders/open",
    controller: OrderController,
    action: "openOrders"
  },
  {
    method: "get",
    route: "orders/:id",
    controller: OrderController,
    action: "one"
  },
  // Payment method CRUD routes
  {
    method: "get",
    route: "payment",
    controller: PaymentMethodController,
    action: "getAll"
  },
  // Inventory CRUD routes
  {
    method: "post",
    route: "inventory",
    controller: InventoryController,
    action: "create"
  },
  {
    method: "get",
    route: "inventory",
    controller: InventoryController,
    action: "getAll"
  }
];
