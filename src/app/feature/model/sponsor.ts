import { Parish } from "./parish";

export class Sponsor {

    id: number;
    firstName: string;
    lastName: string;
    middleInitial: string;
    dayMonth: string;
    IsActive: boolean;
    emailAddress: string;
    appartmentNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: number;
    hasAnyCoSponser: boolean;
    parish: Parish;
    coSponserName: string;
    coSponserFirstName: string;
    coSponserLastName: string;
    coSponserRelationShip: string;
    paymentDate: string;
    contributionAmount: number;
    effectiveDate: string;
}

