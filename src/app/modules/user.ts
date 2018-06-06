export interface Roles {
  admin:  boolean;
}

export class User {
  name: string;
  email:    string;
  photoURL: string;
  roles:    Roles;

  constructor(authData) {
    console.log(authData);
    this.name = authData.displayName;
    this.email    = authData.email;
    this.photoURL = authData.photoURL;
    this.roles    = { admin: false};
  }
}
