import { User } from './user.model';
import { MakerType } from './makerType';

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
    public contactInfo: string,
    public makerType : MakerType,
    public user : User
  ) {
  }
}
