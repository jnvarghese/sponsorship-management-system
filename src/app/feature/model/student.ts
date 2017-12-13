import { Contribution } from './contribution';

export class Student {

  constructor(
    public id: number,
    public name: string,
    public gender: string,
    public isSponsored: boolean,
    public contributions?: Contribution[]
  ) { }
}

