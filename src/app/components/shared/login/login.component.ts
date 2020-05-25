import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Toast } from 'src/app/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginFormInit();
  }

  loginFormInit(): void {
    this.loginForm = this._formBuilder.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  onSubmit(loginForm: FormGroup): any{

    if(!loginForm.valid){ // return if form is invalid
      return;
    }

    const params = this._route.snapshot.queryParams; // catch value from 'continueTo' URL param
    let redirectURL: string = ''; // redirect to home URL after login

    if(params['redirectTo']){
      redirectURL = params['redirectTo']; // redirect to previous URL after login
    }

    this._authService.login(loginForm.value).subscribe(
      (result: any) => {
        //const userRole = result.user.tipoUsuario;
        this._authService.setToken(result.token);
        return this._router.navigate([redirectURL]);
      },
      (error: any) => {
        loginForm.setValue({username: loginForm.value.username, password: ''})
        document.getElementById('password').focus();
        Toast.fire({
          titleText: 'Inténtalo nuevamente',
          icon: 'error',
        });
      }
    );

  }

}
