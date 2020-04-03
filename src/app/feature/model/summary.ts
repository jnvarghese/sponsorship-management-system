import { StudentSummary } from "./student.summary";
import { SponsorReceipts } from "./sponsorreceipts";

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
	netDonation: number;
    numberOfStudents: number;
	students: Array<StudentSummary>;
	sponsorReceipts: Array<SponsorReceipts>;
}