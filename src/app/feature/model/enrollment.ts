import { Sponsee } from "./index";

export class Enrollment {
    goto:string;
    constructor(public sponsorId?: number,
        public sponsorName?: string,
        public paymentDate?: string,
        public effectiveDate?: string,
        public contributionAmount?: number,
        public sponsee?: Array<Sponsee>) { }
}

