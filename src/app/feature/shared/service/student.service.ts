import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student } from "../../model";
import { RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpEvent } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

@Injectable()
export class StudentService {

  private studentsUrl = 'api/student';

  constructor(private http: HttpClient) { }

  getStudentsByProjectId(id: number) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/list/byproject/${id}`);
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

  // Update existing Student
  private put(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/modify/${student.id}`, JSON.stringify(student), { headers });
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

  searchByName(term: string) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/search/${term}`);
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
