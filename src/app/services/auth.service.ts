import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { User } from 'src/app/services/user.model'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const user = {
      username: username,
      password: password
    }
    return this.httpClient.post<any>(`${environment.apiUrl}/users/login`,JSON.stringify(user),{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  register(username: string, password: string){
    const user = {
      username: username,
      password: password
    }
    return this.httpClient.post<any>(`${environment.apiUrl}/users/register`,JSON.stringify(user),{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  logout(){
    localStorage.setItem('currentUser', "");
  }
}
