import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  @Input() error!: string | null;

  constructor(fb: FormBuilder,private authService: AuthService,private router: Router,)
    {
        this.loginForm = fb.group({
          username: ["", Validators.required],
          password: ["", Validators.required],
        });
    }

  submit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username,password).subscribe({next:results=>{
      localStorage.setItem('currentUser',JSON.stringify({
        id: results.id,
        username: results.username
      }));
      this.router.navigate(['/home']);
    },error:(err=>{
      this.error = err.error.message;
    })
  });
  }


}
