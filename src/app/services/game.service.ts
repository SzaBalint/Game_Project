import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  addScore(username:string,difficulty:number,time:string){
    const result = {
      username: username,
      difficulty: difficulty,
      time: time
    }
    return this.httpClient.post<any>(`${environment.apiUrl}/results/add`,JSON.stringify(result),{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  getResults(gameSize:number){
    return this.httpClient.post<any>(`${environment.apiUrl}/results/get`,JSON.stringify({difficulty:gameSize}),{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  getHighResults(gameSize:number){
    return this.httpClient.post<any>(`${environment.apiUrl}/results/getHigh`,JSON.stringify({difficulty:gameSize}),{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  getOwnResults(username:string,gameSize:number){
    return this.httpClient.post<any>(`${environment.apiUrl}/results/getOwn`,JSON.stringify({username:username,difficulty:gameSize}),{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }
}
