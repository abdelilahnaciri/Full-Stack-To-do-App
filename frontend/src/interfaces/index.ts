export interface IRegisterInput {
  name: "username" | "email" | "password";
  type: string;
  placeholder: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILoginInput {
  name: "identifier" | "password";
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

export interface ITodo {
  id: number;
  title: string;
  description: string;
}
