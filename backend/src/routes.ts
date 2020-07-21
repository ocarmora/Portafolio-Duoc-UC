import {AuthController} from "./controller/AuthController";
import { UsuarioController } from "./controller/UsuarioController";
import { ProductCategoryController } from "./controller/ProductCategoryController";
import { ProductController } from "./controller/ProductController";
import { OrderController } from "./controller/OrderController";
import { PaymentMethodController } from "./controller/PaymentMethodController";
import { BusinessController } from "./controller/BusinessController";
import { InventoryController } from "./controller/InventoryController";
import { DocumentTypeController } from "./controller/DocumentTypeController";
import { SaleController } from "./controller/SaleController";

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
    route: "users/roles",
    controller: UsuarioController,
    action: "getRoles"
  },
  {
    method: "get",
    route: "users/:id",
    controller: UsuarioController,
    action: "one"
  },
  {
    method: "delete",
    route: "users/:id",
    controller: UsuarioController,
    action: "deleteUser"
  },
  {
    method: "post",
    route: "users/:id",
    controller: UsuarioController,
    action: "edit"
  },
  {
    method: "post",
    route: "users",
    controller: UsuarioController,
    action: "create"
  },
  {
    method: "get",
    route: "users",
    controller: UsuarioController,
    action: "getAll"
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
    method: "get",
    route: "products/barcode/:barcode",
    controller: ProductController,
    action: "oneByBarcode"
  },
  {
    method: "get",
    route: "products/sku/:sku",
    controller: ProductController,
    action: "oneBySku"
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
    route: "orders",
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
    route: "orders/pending",
    controller: OrderController,
    action: "pendingOrders"
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
  },
  {
    method: "get",
    route: "inventory/:id/detail",
    controller: InventoryController,
    action: "getDetail"
  },
  {
    method: "get",
    route: "inventory/criticalStock",
    controller: InventoryController,
    action: "getCriticalStock"
  },
  // Document type CRUD routes
  {
    method: "get",
    route: "document/types",
    controller: DocumentTypeController,
    action: "all"
  },
  {
    // Client CRUD
    method: "get",
    route: "customers/:rut",
    controller: UsuarioController,
    action: "getCustomerDetail"
  },
  {
    // Sale CRUD
    method: "get",
    route: "sales/helpers/payment-methods",
    controller: SaleController,
    action: "getSalePaymentMethods"
  },
  {
    method: "get",
    route: "sales/",
    controller: SaleController,
    action: "getAll"
  },
  {
    method: "post",
    route: "sales",
    controller: SaleController,
    action: "makeSale"
  },
  {
    method: "get",
    route: "sales/stats",
    controller: SaleController,
    action: "getStats"
  },
  {
    method: "get",
    route: "sales/last/:days",
    controller: SaleController,
    action: "getLastSales"
  },
  {
    method: "get",
    route: "sales/:year/stats",
    controller: SaleController,
    action: "getMonthlySales"
  },
  {
    method: "get",
    route: "sales/product/:year/:month/best",
    controller: SaleController,
    action: "bestSellingProduct"
  },
  {
    method: "get",
    route: "providers/detail/:id",
    controller: UsuarioController,
    action: "providerDetail"
  },
];
