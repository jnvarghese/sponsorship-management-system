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
    coSponserFirstName: string;
    coSponserLastName: string;
    coSponserRelationShip: string;
}

