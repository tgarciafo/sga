import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export const checkEquality: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repeat_password = control.get('repeat_password');

    return password?.value === repeat_password?.value ? null : { equals: true };
    };
