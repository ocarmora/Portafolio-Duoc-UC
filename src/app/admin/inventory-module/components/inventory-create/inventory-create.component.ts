import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/shared/util';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {

  constructor(private _router: Router, private _inventoryService: InventoryService) { }

  ngOnInit(): void {
  }

  create(orderValues: any){

    //Subcsribe to service here
    this._inventoryService.create(orderValues).subscribe(result => {

      Toast.fire({
        icon: 'success',
        titleText: 'Productos ingresados'
      });

      this._router.navigate(['/admin/inventario']);

    }, (error) => {
      console.log(error);
    });



  }

}
