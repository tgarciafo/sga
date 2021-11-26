import { AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function checkWord(mask: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = mask.test(control.value);
      return invalid ? {'invalidWord': {value: control.value}} : null;
    };
}