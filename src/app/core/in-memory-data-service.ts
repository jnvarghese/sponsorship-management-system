import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student, sponsor } from '../feature/model/index';

export class InMemoryDataService implements InMemoryDbService {
 createDb() {
   const sponsors:sponsor[] = [
     { id: 1, name: 'Windstorm', active:true},
     { id: 2, name: 'Bombasto', active:true },
     { id: 3, name: 'Magneta', active:false },
     { id: 4, name: 'Tornado', active:true }
   ];
   const students:Student[] = [
    { id: 1, name: 'Jinu', gender: 'Male' , issponsored:true   },
    { id: 2, name: 'Rajeev', gender: 'Male' , issponsored:true },
    { id: 3, name: 'Sriram', gender: 'Male' , issponsored:false },
    { id: 4, name: 'Ajni', gender: 'Female' , issponsored:true }
  ];
   return {students, sponsors};
 }
}
