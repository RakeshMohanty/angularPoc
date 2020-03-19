import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";
import { PasswordValidation } from 'app/user-management/_models/password-validation.model';


export class CustomValidation {

    static passwordMatchValidator = (controlName: string, matchingControlName: string) => {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (!control.value || !matchingControl.value) {
                return null;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ noPassswordMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    static passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        let passwordOuput = {} as PasswordValidation;
        if (control.value) {
            if (control.value) {
                const upperCasePattern: RegExp = /[A-Z]/;
                if (!upperCasePattern.test(control.value)) {
                    passwordOuput.invalidUpperCase = true;
                }
                const numberPattern: RegExp = /[0-9]/;
                if (!numberPattern.test(control.value)) {
                    passwordOuput.invalidNumber = true;
                }
                const smallCasePattern: RegExp = /[a-z]/;
                if (!smallCasePattern.test(control.value)) {
                    passwordOuput.invalidSmallCase = true;
                }
            }
            return passwordOuput;
        }
    }
}