import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/MyServices/helper.service';
import { HttpService } from 'src/app/MyServices/http.service';
import { ValidatorService } from 'src/app/MyServices/validator.service';
import { CONSTANTS } from '../notepad-static-data';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public newUser: boolean = false;
  public appLoading: boolean = false;
  public formSignup: FormGroup;

  private _validator = new ValidatorService();
  private _helper = new HelperService();
  private _httpHelper = new HttpService(this._httpClient);

  constructor(private router: Router, private _httpClient: HttpClient, private builder: FormBuilder) {
    this.formSignup = this._validator.createLogInForm(builder, this.newUser);
  }

  getInput(key: string) {
    return this.formSignup.controls[key];
  }

  clickLoginButton() {
    this.appLoading = true;

    this.newUser ? this._httpHelper.getDataFromDB().subscribe(_response => this._isUserAlreadyPresent(_response)) :
      this._httpHelper.getDataFromDB().subscribe(_response => this._afterRecievingdata(_response));
  }

  clickSignUpButton(_goBack: boolean) {
    this.newUser = !_goBack;
    this.formSignup = this._validator.createLogInForm(this.builder, this.newUser);
  }

  _isUserAlreadyPresent(_response: any) {
    let authUser: any = this._helper.getAuthUserData(_response, this.getInput('email').value, this.getInput('password').value);
    if (authUser._id) {
      //error
      this.appLoading = false;
      alert('Email with "' + this.getInput('email').value + '" name already exists. Please Try Login');
      window.location.reload();
    } else {
      this._httpHelper.addNewUserToDB(this.getInput('email').value, this.getInput('password').value).subscribe(_response => this._afterAddingNewUser(_response));
    }
  }

  _afterAddingNewUser(_response: any) {
    this._helper.saveToLocalStorage(_response);
    this.router.navigate(['/' + CONSTANTS.homePageRoute, _response._id]);
  }

  _afterRecievingdata(_response: any) {
    let authUser: any = this._helper.getAuthUserData(_response, this.getInput('email').value, this.getInput('password').value);
    if (!authUser.error) {
      this._helper.saveToLocalStorage(authUser);
      this.router.navigate(['/' + CONSTANTS.homePageRoute, authUser._id]);
      return;
    }
    alert('No Email with "' + this.getInput('email').value + '" name exists. Please Try Signup');
    window.location.reload();
  }
}
