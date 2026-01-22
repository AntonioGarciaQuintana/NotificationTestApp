import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CatalogService } from '../../services/catalog.service';
import { Category } from '../../model/category.model';
import { NotificationService } from '../../services/notification.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TouchedOrSubmittedMatcher } from '../../shared/error-state-matcher/touched-or-submitted.matcher';
import { FieldError } from '../../model/field-error.model';

@Component({
  standalone: true,
  selector: 'app-submission',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  categories: Array<Category> = [];
  loading = false;
  submitted = false;
  matcher = new TouchedOrSubmittedMatcher();

  private fb = inject(NonNullableFormBuilder);
  private snackBar = inject(MatSnackBar);
  private catalogService = inject(CatalogService);
  private notificationService = inject(NotificationService);

  form = this.fb.group({
    category: ['', Validators.required],
    message: ['', [Validators.required, Validators.maxLength(500)]],
  });
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.catalogService.getCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.notificationService
      .sendNotification(this.form.getRawValue())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (result) => {
          this.printMessage('Message sent successfully', true);
          this.resetForm();
        },
        (err) => {
          const apiError = err.error;
          if (apiError?.code === 'VALIDATION_ERROR' && apiError.errors) {
            this.handleValidationErrors(apiError.errors);
            this.printMessage(apiError.message, false);
            return;
          }

          // fallback para otros errores
          this.printMessage(apiError?.message || 'Unexpected error', false);
        },
      );
  }

  private handleValidationErrors(errors: FieldError[]): void {
  errors.forEach(err => {
    const control = this.form.get(err.field);
    if (control) {
      control.setErrors({ server: err.message });
      control.markAsTouched();
    }
  });
}

  private resetForm(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
    this.submitted = false;
  }

  private printMessage(message: string, isSuccess: boolean) {
    this.snackBar.open(message, isSuccess ? 'OK' : 'ERROR', {
      duration: 3000,
    });
  }
}
