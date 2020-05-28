import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  path: string;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.path = this._router.url;
  }


}
