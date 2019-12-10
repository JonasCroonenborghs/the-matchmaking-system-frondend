export class Assignment {
  constructor(
    public assignmentID: number,
    public companyID: number,
    public makerID: number,
    public title: string,
    public description: string,
    public location: string,
    public date: string,
    public deadline: string,
    public status: string
  ) {
  }
}
