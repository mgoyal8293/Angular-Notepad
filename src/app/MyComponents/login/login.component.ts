import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/MyServices/helper.service';
import { HttpService } from 'src/app/MyServices/http.service';
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
  private _helper = new HelperService();
  private _httpHelper = new HttpService(this._httpClient);

  constructor(private router: Router, private _httpClient: HttpClient) {}

  clickLoginButton(isSigningUp? : boolean) {
    let _validation = this._service.validateDetails(this.userName, this.password);

    if (_validation.error) {
      alert(_validation.message);
      return;
    }
    this.appLoading = true;

    isSigningUp ? this._httpHelper.getDataFromDB().subscribe(_response => this._isUserAlreadyPresent(_response)) :
      this._httpHelper.getDataFromDB().subscribe(_response => this._afterRecievingdata(_response));
  }

  _isUserAlreadyPresent(_response: any) {
    let authUser: any = this._helper.getAuthUserData(_response, this.userName);
    if (authUser._id) {
      //error
      this.appLoading = false;
      alert('Username already present');
      window.location.reload();
    } else {
      this._httpHelper.addNewUserToDB(this.userName, this.password).subscribe(_response => this._afterAddingNewUser(_response));
    }
  }
 
  _afterAddingNewUser(_response: any) {
    this._helper.saveToLocalStorage(_response);
    this.router.navigate(['/' + CONSTANTS.homePageRoute, _response._id]);
  }

  _afterRecievingdata(_response: any) {
    let authUser: any = this._helper.getAuthUserData(_response, this.userName);
    if (!authUser.error) {
      this._helper.saveToLocalStorage(authUser);
      this.router.navigate(['/' + CONSTANTS.homePageRoute, authUser._id]);
      return;
    }
    alert('Username not found');
    window.location.reload();
  }
}
