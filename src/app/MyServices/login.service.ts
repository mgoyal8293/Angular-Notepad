import { Injectable } from '@angular/core';
import { CONSTANTS } from '../MyComponents/notepad-static-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  validateDetails(username: string, password: string) {
    if (!username) {
      return {error: true, message: CONSTANTS.userNameEmpty};
    } else if (!password) {
      return {error: true, message: CONSTANTS.passwordEmpty};
    } else {
      return {error: false};
    }
  }
  
}
