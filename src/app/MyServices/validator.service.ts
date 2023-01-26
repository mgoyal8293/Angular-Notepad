import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  _patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return {};
      }
      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  _passwordMatchValidator(control: any) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  createLogInForm(builder: FormBuilder, signUpForm: boolean): FormGroup {
    const emailValidations = [
      null,
      Validators.compose([
        Validators.email,
        Validators.required
      ])
    ], passwordValidations = [
      null,
      Validators.compose([
        Validators.required,
        this._noWhitespaceValidator,
        Validators.minLength(6)
      ])
    ];

    if (signUpForm) {
      return builder.group({
        email: emailValidations,
        password: passwordValidations,
        confirmPassword: [null, Validators.compose([Validators.required])]
      }, {
        validator: this._passwordMatchValidator
      });
    } else {
      return builder.group({
        email: emailValidations,
        password: passwordValidations
      });
    }
  }

  _noWhitespaceValidator(control: any) {
    let isWhitespace = (control.value || '').match(/\s/g);
    const isValid = !isWhitespace;
    return isValid ? null : { hasWhiteSpace: true };
  }
}
