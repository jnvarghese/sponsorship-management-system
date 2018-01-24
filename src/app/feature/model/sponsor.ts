import { Parish } from "./parish";

export class Sponsor {

    id: number;
    firstName: string;
    lastName: string;
    middleInitial: string;
    dayOfBirth: number;
    monthOfBirth: number;
    sponsorStatus: number;
    emailAddress: string;
    appartmentNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: number;
    hasAnyCoSponser: boolean;
    parishId: number;
    parishName: string;
    coSponserName: string;
    coSponserFirstName: string;
    coSponserLastName: string;
    coSponserRelationShip: string;
    paymentDate: string;
    contributionAmount: number;
    effectiveDate: string;
}

