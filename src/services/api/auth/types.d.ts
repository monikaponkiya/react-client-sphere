export interface ISignInReq {
  email: string;
  password: string;
}

export interface ISignInRes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  access_token: string;
}

export interface IForgotPwdReq {
  email: string;
  employeeType: string;
}

export interface IResetPasswordReq {
  token: string;
  password: string;
  employeeType: string;
}

export interface IChangePasswordReq {
  id: number;
  currentPassword: string;
  newPassword: string;
}

export interface IChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
