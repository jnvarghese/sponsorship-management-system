import { Parish } from "./parish";

export class Sponsor {

    id: number;
    firstName: string;
    lastName: string;
    IsActive: boolean;
    emailAddress: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    hasAnyCoSponser: boolean;
    parish: Parish;
    coSponserFirstName?: string;
    coSponserLastName?: string;
    coSponserRelationShip?: string;
    appartmentNumber?: string;
    middleInitial?: string;
    dayMonth?: string;

}

