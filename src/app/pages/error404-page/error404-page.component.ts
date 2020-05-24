import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.css']
})
export class Error404PageComponent implements OnInit {

  path: string;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.path = this._router.url;
  }

}
