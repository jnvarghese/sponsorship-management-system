import { Student } from './index';

export class SponsorshipInfo {

  constructor(
    public id: number,
    public name: string,
    public isActive: boolean,
    public students?: Student[]
  ) { }
}

