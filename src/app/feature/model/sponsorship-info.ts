import { Sponsor, Student } from "./index";

export class SponsorshipInfo {

  constructor(   
    public sponser: Sponsor,
    public isActive: boolean,
    public students: Student[]
  ) { }
}

