export class Assignment {
  constructor(
    public assignmentID: number,
    public companyID: number,
    public makerID: number,
    public title: string,
    public description: string,
    public closeDate: Date
  ) {
  }
}
