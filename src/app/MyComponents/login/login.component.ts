import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/MyServices/helper.service';
import { LoginService } from 'src/app/MyServices/login.service';
import { CONSTANTS } from '../notepad-static-data';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public userName : string = '';
  public password : string = '';
  public appLoading : boolean = false;

  private _service = new LoginService();
  private _helper = new HelperService(this._httpClient);

  constructor(private router: Router, private _httpClient: HttpClient) {}

  clickLoginButton() {
    let _validation = this._service.validateDetails(this.userName, this.password);

    if (_validation.error) {
      alert(_validation.message);
      return;
    }
    this.appLoading = true;
    this._helper.getDataFromDB().subscribe(_response => this.afterRecievingdata(_response));
  }

  afterRecievingdata(_response: any) {
    let authUser: any = this._helper.getAuthUserData(_response);
    this._helper.saveToLocalStorage(authUser);
    this.router.navigate(['/' + CONSTANTS.homePageRoute, authUser._id]);
  }

}
