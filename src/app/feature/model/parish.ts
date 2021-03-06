import { ParishProject } from './index';

export class Parish {
         id: number;
         code: string;
         name: string;
         city: string;
         centerId: number;
         regionName: string;
         centerName: string;
         promoterEmail: string;
         parishProjects: Array<ParishProject>;
         status: string;
         createdBy: number;
         updatedBy: number;
}
