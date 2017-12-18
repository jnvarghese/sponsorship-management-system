import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { catchError, map, tap } from 'rxjs/operators';
import { Student } from '../../model/student';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class StudentService {

  private studentsUrl = 'api/students';  // URL to web api

  constructor( private http: HttpClient) { }

  /** GET Studentes from the server */
  getStudents (): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  save(student: Student): Promise<Student> {
    if (student.id) {
      return this.put(student);
    }
    student.id = new Date().getMilliseconds();
    return this.post(student);
  }

  // Add new Student
  private post(student: Student): Promise<Student> {
    return this.http
      .post(this.studentsUrl, JSON.stringify(student), httpOptions)
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  // Update existing Student
  private put(student: Student): Promise<Student> {

    const url = `${this.studentsUrl}/${student.id}`;

    return this.http
      .put(url, JSON.stringify(student), httpOptions)
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  search(term: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentsUrl}/?name=${term}`)
      .catch((error: any) => {
          console.error('An friendly error occurred', error);
          return Observable.throw(error.message || error);
      });
  }
}
