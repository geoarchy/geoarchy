/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_createUser_account {
  __typename: "AccountPayload";
  id: string | null;
}

export interface LoginUser_createUser {
  __typename: "UserPayload";
  account: LoginUser_createUser_account;
  token: string;
}

export interface LoginUser_login_account {
  __typename: "AccountPayload";
  id: string | null;
}

export interface LoginUser_login {
  __typename: "UserPayload";
  account: LoginUser_login_account;
  token: string;
}

export interface LoginUser {
  createUser: LoginUser_createUser | null;
  login: LoginUser_login | null;
}
