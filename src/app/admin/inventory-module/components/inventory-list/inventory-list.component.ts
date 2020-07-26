import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  inventory: any = [];
  inventoryDetail: any = [];
  modalTitle: string;
  currentUser: any = {};

  constructor(private _authService: AuthService, private _inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getInventory();
    this.getCurrentUser();
  }

  getInventory(){
    this._inventoryService.getAll().subscribe(result => {
      this.inventory = result;
    });
  }

  getInventoryDetail(productId: number){
    this._inventoryService.getInventoryDetail(productId).subscribe(result => {
      this.inventoryDetail = result;
    })
  }

  openOrderViewer(orderId: number){
    window.open("http://localhost:4200/admin/ordenes-de-compra/viewer/" + orderId, "Orden de compra Nº" + orderId, "width=1024, height=890,scrollbars=NO");
  }

  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }

}
