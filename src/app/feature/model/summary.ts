import { StudentSummary } from "./student.summary";

export class Summary{

    sponsorId: number;
    sponsorCode: string;
	studentId: number;
	sponsorFirstName: string;
	sponsorLastName: string;
    sponsorMi: string;
	sponsorNickName: string;
	parishName: string;
	parishCity: string;
	contribution: number;
    numberOfStudents: number;
    students: Array<StudentSummary>;
}