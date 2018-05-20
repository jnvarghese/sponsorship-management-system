import { Project, Contribution } from './index';

export class Student {
  id: number;
  studentName : string;
  studentCode: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  status: string;
  projectId: string;
  projectName: string;
  agencyName: string;
  softlocked = false;
  expirationMonth: number;
  expirationYear: number;
  nameOfGuardian: string;
  occupationOfGuardian: string;
  baseLanguage: string;
  grade: string;
  favColor: string; //50
  favGame: string; //200
  imagePresent: number; // 1 for present 0 for null
  imageLinkRef?: string;
  hobbies?: string;
  talent?: string;
  recentAchivements?: string[];
  middleName?: string;
  profilePicture?: string;
  contributions?: Contribution[];
  createdBy: number;
  updatedBy: number;
}
