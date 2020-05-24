import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MessageService ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private messageService: MessageService, private _authService: AuthService, private _router: Router) { }

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
    if(!loginForm.valid){
      return;
    }

    this._authService.login(loginForm.value).subscribe(
      (result: any) => {
        this._authService.setToken(result.token);
        this._router.navigate(['']);
      },
      (error: any) => {
        loginForm.setValue({username: loginForm.value.username, password: ''})
        document.getElementById('password').focus();
        return this.messageService.add({severity:'error', summary:'¡Ops!', detail:'Inténtalo nuevamente'});
      }
    );

  }

}
