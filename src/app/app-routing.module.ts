import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/page/game/game.component';
import { ResultsComponent } from './components/page/results/results.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  // { path: '', HomeComponent},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'game', component: GameComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'home', component:HomeComponent },
      { path: 'profile', component:ProfileComponent },
    ],
  },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


