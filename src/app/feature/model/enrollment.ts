import { Sponsee } from './index';

export class Enrollment {
    goto: string;
    constructor(public sponsorId?: number,
        public parishId?: number,
        public sponsorName?: string,
        public paymentDate?: string,
        public effectiveDate?: string,
        public contributionAmount?: number,
        public miscAmount?: number,
        public sponsees?: Array<Sponsee>) { }
}

