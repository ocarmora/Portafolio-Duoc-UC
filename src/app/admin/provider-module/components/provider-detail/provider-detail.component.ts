import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.css']
})
export class ProviderDetailComponent implements OnInit {

  provider: any = {};

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _providerService: ProviderService) { }

  ngOnInit(): void {
    this.getProviderDetail();
  }

  getProviderDetail(){
    this._activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id){
        return this._router.navigate['404'];
      }
      this._providerService.getDetail(id).subscribe(detail => {
        this.provider = detail;
      }, (e) => {
        Toast.fire({
          icon: 'error',
          titleText: 'Favor recarga la página'
        })
        console.error(e);
      })

    })
  }

}
