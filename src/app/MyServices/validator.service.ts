import { Injectable } from '@angular/core';
import { CONSTANTS } from '../MyComponents/notepad-static-data';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  loginDetails(username: string, password: string) {
    let _returningObj = this._emptyFieldValidator(username, password);
    if (!_returningObj.error) {
      _returningObj = this._invalidCharValidator(username, password);
      if (!_returningObj.error) {
        _returningObj = this._whiteSpaceValidator(username, password);
      }
    }
    return _returningObj;
  }

  _invalidCharValidator(username: string, password: string) {
    if (username.match(/[-!$%^&*()+|~=`{}\[\]:";#'<>?,\/]/)) {
      return { error: true, message: CONSTANTS.userNameEmpty };
    } else if (password.match(/[-()+|~=`{}\[\]:";'<>,.\/]/)) {
      return { error: true, message: CONSTANTS.passwordEmpty };
    }
    return { error: false };
  }

  _whiteSpaceValidator(username: string, password: string) {
    let isWhitespace = username.match(/\s/g);
    if (!isWhitespace?.length) {
      isWhitespace = password.match(/\s/g);
      if (!isWhitespace?.length) {
        return { error: false };
      }
    }
    return { error: true, message: CONSTANTS.userNameEmpty };
    
  }

  _emptyFieldValidator(username: string, password: string) {
    if (!username) {
      return { error: true, message: CONSTANTS.userNameEmpty };
    } else if (!password) {
      return { error: true, message: CONSTANTS.passwordEmpty };
    } else {
      return { error: false };
    }
  }

}
