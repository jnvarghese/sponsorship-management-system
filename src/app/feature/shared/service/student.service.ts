import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student, StudentSummary } from "../../model";
import { RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpEvent } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

@Injectable()
export class StudentService {

  private api = 'api';
  private studentsUrl = `${this.api}/student`;

  constructor(private http: HttpClient) { }
  
  downloadExcel(id: number){
    return this.http.get(this.api + "/excel/students/activeinactive/" + id, {
      responseType: "blob"
  });
  }

  getStudentsByProjectId(id: number) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/list/byproject/${id}`);
  }

  getStudentSummaryByProjectId(id: number) {
    return this.http.get(`${this.studentsUrl}/summary/project/${id}`);
  }
  

  getStudents() {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/list`);
  }

  getSequence(id: number) {
    return this.http.get(`${this.studentsUrl}/sequence/${id}`);
  }

  findStudent(id: number) {
    return this.http.get<Student>(`${this.studentsUrl}/find/${id}`);
  }

  save(student: Student): Observable<Student> {
    if (student.id) {
      return this.put(student);
    }
    return this.post(student);
  } 

  private post(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.studentsUrl}/add`, JSON.stringify(student), { headers });
  }

  public swapStudent(sourceStudent: number, targetStudent: number, enrollmentId: number) {
    return this.http.post(`${this.studentsUrl}/swap`, 
    {sourceStudent: sourceStudent, targetStudent: targetStudent, enrollentId: enrollmentId}, { headers });
  }

  // Update existing Student
  private put(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/modify/${student.id}`, JSON.stringify(student), { headers });
  }
  searchByName(term: string) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/search/${term}`);
  }
  
  getByParishAndProject(parishId: number, projectId: number) {
    console.log(` parish id ${parishId} and projectId ${projectId}`)
    return this.http.get<Array<Student>>(`${this.studentsUrl}/list/unenrolled/${parishId}/${projectId}`);
  }

  search(term: string, parishId: number, effectiveDate: string) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/search/${term}/${parishId}/${effectiveDate}`);
  }

  listByEnrollmentId(enrollmentId: number) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/list/byenrollmentid/${enrollmentId}`);
  }

  searchByParishAndName(parishId:number, term: string) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/search/${term}/${parishId}`);
  }

  searchByParish(parishId:number) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/search/byparish/${parishId}`);
  }

  enrollmentBySponsorId(sponsorId: number) {
    return this.http.get<Array<StudentSummary>>(`${this.studentsUrl}/enrollment/sponsor/${sponsorId}`);
  }

  activeInactive() {
    return this.http.get<Array<StudentSummary>>(`${this.studentsUrl}/active/inactive`);
  }

  uploadImage(filesToUpload: File, studentId: number): Observable<HttpEvent<{}>>{
    console.log( 'studentId ', studentId);
    let formData = new FormData();
    formData.append("file", filesToUpload, filesToUpload.name);
    formData.append("userId", localStorage.getItem('userId') || '0');

    const req = new HttpRequest('POST', `${this.studentsUrl}/image/${studentId}`, formData, {
      reportProgress: true,
      responseType: 'text'
    });    
    return this.http.request(req);
  }

}
