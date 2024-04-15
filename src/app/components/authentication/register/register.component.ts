import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:FormGroup;
  @Input() error!: string | null;

  constructor(fb: FormBuilder,private authService: AuthService,private router: Router,)
    {
        this.registerForm = fb.group({
          username: ["", Validators.required],
          password: ["", Validators.required],
          passwordRepeat: ["", Validators.required]
        });
    }

  submit() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    const passwordRepeat = this.registerForm.value.passwordRepeat;
    if(password == passwordRepeat){
      this.authService.register(username,password).subscribe({
        next:results=>{
        this.router.navigate(['/login']);
        },
        error:(err=>{
        this.error = err.error.message;
      })
      });
    }
    else {
      this.error = "Passwords don't match";
    }
  }
}
