import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  inventory: any = [];

  constructor(private _inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getInventory();
  }

  getInventory(){
    this._inventoryService.getAll().subscribe(result => {
      this.inventory = result;
    });
  }

}
