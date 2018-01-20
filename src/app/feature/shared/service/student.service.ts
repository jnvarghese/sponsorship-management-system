import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { catchError, map, tap } from 'rxjs/operators';
import { Student } from '../../model/student';


@Injectable()
export class StudentService {

  private studentsUrl = 'api/student';  // URL to web api

  constructor(private http: Http) { }

  /** GET Studentes from the server */
  getStudents(): Promise<Array<Student>> {
    return this.http.get(`${this.studentsUrl}/list`).toPromise()
      .then((response) => {
        return response.json() as Student[];
      })
      .catch(this.handleError);
  }

  /** GET Studentes from the server */
  findStudent(id: number): Promise<Student> {
    return this.http.get(`${this.studentsUrl}/find/${id}`).toPromise()
      .then((response) => {
        return response.json() as Student;
      })
      .catch(this.handleError);

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
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(`${this.studentsUrl}/add`, JSON.stringify(student), { headers: headers })
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  // Update existing Student
  private put(student: Student): Promise<Student> {

    const url = `${this.studentsUrl}/modify/${student.id}`;
    console.log('  url ', url);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .put(url, JSON.stringify(student), { headers: headers })
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  search(term: string): Promise<Array<Student>> {
    return this.http.get(`${this.studentsUrl}/?firstName=${term}`)
      .toPromise()
      .then((response) => {
        return response.json().data as Array<Student>;
      })
      .catch(this.handleError);
  }
}
