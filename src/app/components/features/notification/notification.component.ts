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
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  categories: Array<Category> = [];

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
    if (this.form.invalid) {
      return;
    }
    this.notificationService
      .sendNotification(this.form.getRawValue())
      .subscribe(
        (result) => {
          this.printMessage('Message sent successfully', true);
          this.resetForm();
        },
        (error) => {
          this.printMessage(
            'An error occurred while sending the notification',
            false
          );
        }
      );
  }

  private resetForm(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private printMessage(message: string, isSuccess: boolean) {
    this.snackBar.open(message, isSuccess ? 'OK' : 'ERROR', {
      duration: 3000,
    });
  }
}
