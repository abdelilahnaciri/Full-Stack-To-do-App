import { string } from "yup";

export interface IFormInputs {
  name: "username" | "email" | "password";
  type: string;
  placeholder: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface IErrorResponse {
  error: {
    details?: {
      error: {
        message: string;
      }[];
    };
    message: string;
  };
}
