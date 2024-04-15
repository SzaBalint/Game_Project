import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usernameForm:FormGroup;
  passwordForm:FormGroup;
  @Input() errorUsername!: string | null;
  @Input() errorPassword!: string | null;
  @Input() successUsername!: string | null;
  @Input() successPassword!: string | null;
  username = "";

  constructor(fb: FormBuilder,private userService: UserService)
    {
        this.usernameForm = fb.group({
          username: ["", Validators.required],
        });
        this.passwordForm = fb.group({
          oldPassword: ["", Validators.required],
          newPassword1: ["", Validators.required],
          newPassword2: ["", Validators.required],
        });
    }

    ngOnInit(): void {
      const currentUserString = localStorage.getItem("currentUser");
      if(currentUserString){
        const currentUser = JSON.parse(currentUserString);
        this.username = currentUser.username;
      }
    }

    submitUsername(){
      const currentUser = localStorage.getItem("currentUser");
      const username = this.usernameForm.value.username;
      console.log(username);
      if(currentUser){
        const userID = (Number)(JSON.parse(currentUser).id);
        if(this.usernameForm.valid){
          this.userService.updateUsername(userID,username).subscribe({next:results =>{
            const newCurrentUser = {
              id: userID,
              username: username
            }
            this.successUsername = "Username updated successfully";
            this.errorUsername = "";
            localStorage.setItem("currentUser",JSON.stringify(newCurrentUser));
            this.username = username;
          },
          error:(err=>{
            this.successUsername = "";
            this.errorUsername = err.error.message;
          })
        });
        }
      }
    }

    submitPassword(){
      const oldPassword = this.passwordForm.value.oldPassword;
      const newPassword1 = this.passwordForm.value.newPassword1;
      const newPassword2 = this.passwordForm.value.newPassword2;
      const currentUser = localStorage.getItem("currentUser");

      if(currentUser){
        const username = JSON.parse(currentUser).username;
        if(this.passwordForm.valid){
          if(newPassword1 != newPassword2){
            this.successPassword = "";
            this.errorPassword = "Passwords do not match"
          }
          else{
            this.userService.changePassword(oldPassword,newPassword1,username).subscribe({next:(results:any)=>{
              this.successPassword = "Password updated successfully";
              this.errorPassword = "";
            },error:((err:any) =>{
              this.successPassword = "";
              this.errorPassword = err.error.message
            })
          })
          }
      }
      }
    }
  }
