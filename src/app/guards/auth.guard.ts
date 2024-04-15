import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {

  constructor(private router:Router){}

  canActivate() { //route: ActivatedRouteSnapshot
    const currentUser = localStorage.getItem('currentUser');
    if(!currentUser){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
