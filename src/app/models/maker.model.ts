export class Maker {
  constructor(
    public makerID: number,
    public makerTypeID: number,
    public userID: number,
    public nickname: string,
    public birthDate: Date,
    public biography: string,
    public linkedIn: string,
    public experience: string,
    public contactInfo: string
  ) {
  }
}
