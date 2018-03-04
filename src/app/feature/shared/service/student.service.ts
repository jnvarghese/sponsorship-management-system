import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student } from "../../model";
import { RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

@Injectable()
export class StudentService {

  private studentsUrl = 'api/student';

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/list`);
  }

  findStudent(id: number) {
    return this.http.get<Student>(`${this.studentsUrl}/find/${id}`);
  }

  save(student: Student) {
    if (student.id) {
      return this.put(student);
    }
    return this.post(student);
  }

  private post(student: Student) {
    return this.http.post<Student>(`${this.studentsUrl}/add`, JSON.stringify(student), { headers });
  }

  // Update existing Student
  private put(student: Student) {
    return this.http.put<Student>(`${this.studentsUrl}/modify/${student.id}`, JSON.stringify(student), { headers });
  }

  search(term: string, parishId: number, effectiveDate: string) {
    return this.http.get<Array<Student>>(`${this.studentsUrl}/search/${term}/${parishId}/${effectiveDate}`);
  }

  uploadImage(filesToUpload: File, studentId: string): Observable<any>{
    let headers = new HttpHeaders();
    headers.set('id', studentId);
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Upload-Content-Type', filesToUpload.type)
   // let options = new RequestOptions({ headers });
    return this.http.post(this.studentsUrl+'/image', filesToUpload, {headers});
  }

}
