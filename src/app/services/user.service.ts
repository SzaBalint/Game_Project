import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  updateUsername(userID:number,username:string){
    return this.httpClient.patch<any>(`${environment.apiUrl}/users/updateUsername`,{userID: userID, username:username},{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  changePassword(oldPassword:string,newPassword:string,username:string){
    return this.httpClient.patch<any>(`${environment.apiUrl}/users/changePassword`,{username: username, oldPassword:oldPassword,newPassword: newPassword},{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

}
