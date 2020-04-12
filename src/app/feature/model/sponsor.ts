import { Parish } from './parish';

export class Sponsor {

    id: number;
    firstName: string;
    lastName: string;
    nickName: string;
    middleInitial: string;
    dayOfBirth: number;
    monthOfBirth: number;
    sponsorStatus: number;
    phone1: string;
    sponsorCode: string;
    emailAddress: string;
    promoterEmail: string;
    appartmentNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: number;
    hasAnyCoSponser: boolean;
    parishId: number;
    parishName: string;
    parishCity: string;
    centerId: number;
    coSponserName: string;
    coSponserFirstName: string;
    coSponserLastName: string;
    coSponserRelationShip: string;
    paymentDate: string;
    contributionAmount: number;
    effectiveDate: string;
    createdBy: number;
    updatedBy: number;

    entId: number;
    enrollmentId:number;
    noOfStudents: number;
    expirationMonth: number;
    expirationYear: number;
    miscAmount: number;

    type: string;
    amount: number;
    enrollmentNetAmount: number;
    sponsorReceiptId: number
    //effectiveDate: Date;
}
