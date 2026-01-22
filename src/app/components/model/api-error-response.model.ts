import { FieldError } from "./field-error.model";

export interface ApiErrorResponse {
  code: string;
  message: string;
  errors?: FieldError[];
}