import { Agency } from './agency';

export class Project {
    id: number;
    name: string;
    code: string;
    address: string;
    selected: boolean;
    contactNumber: string;
    contactEmail: string;
    status: string;
    agencyId: number;
    agencyCode: string;
    agencyName: string;
    createdBy: number;
    updatedBy: number;
}
