export class users {
  public uid: number;
  public pwd: string;
  public email: string;

  constructor(uid: number, pwd: string, email: string) {
    this.uid = uid;
    this.pwd = pwd;
    this.email = email;
  }
}
