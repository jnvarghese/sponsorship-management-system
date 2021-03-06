import { Sponsee } from './index';

export class Enrollment {
    goto: string;
    createdBy: number;
    constructor(
        public enrollmentId?:number,
        public sponsorId?: number,
        public parishId?: number,
        public sponsorName?: string,
        public paymentDate?: string,
        public effectiveDate?: string,
        public contributionAmount?: number,
        public mode?: string,
        public studentCount?: number,
        public expirationMonth?: number,
        public expirationYear?: number,
        public miscAmount?: number,
        public sponsees?: Array<Sponsee>) { }
}

