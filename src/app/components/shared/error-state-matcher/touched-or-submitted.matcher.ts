import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class TouchedOrSubmittedMatcher implements ErrorStateMatcher {
   isErrorState(control: FormControl | null): boolean {
    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }
}
