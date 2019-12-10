export class User {
  constructor(
    public userID: number,
    public firstName: string,
    public secondName: string,
    public email: string,
    public password: string,
    public creationDate: string,
    public token: string,
    public Role: string
  ) {
  }
}
