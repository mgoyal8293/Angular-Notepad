import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './MyComponents/home-page/home-page.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { CONSTANTS } from './MyComponents/notepad-static-data';

const routes: Routes = [
  {path: '' , redirectTo : '/' + CONSTANTS.loginPageRoute, pathMatch: 'full'},
  {path: CONSTANTS.homePageRoute + '/:' + CONSTANTS.urlParam, component: HomePageComponent},
  {path: CONSTANTS.loginPageRoute, component: LoginComponent},
  {path: '**' , redirectTo : '/' + CONSTANTS.loginPageRoute}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
