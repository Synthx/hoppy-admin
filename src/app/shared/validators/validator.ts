import { ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
    return control => {
        const { password, confirmPassword } = control.value;

        return password !== confirmPassword ? { confirmPassword: true } : null;
    };
}

export function passwordValidator(): ValidatorFn {
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    return control => {
        return !regex.test(control.value) ? { strongPassword: true } : null;
    };
}

export function pseudoValidator(): ValidatorFn {
    const regex = new RegExp('^[A-Z0-9a-z_-]+$');

    return control => {
        return !regex.test(control.value) ? { pseudo: true } : null;
    };
}
