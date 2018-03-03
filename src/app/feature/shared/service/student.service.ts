import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
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

  save(student: Student, filesToUpload: File): Promise<Student> {
    if (student.id) {
      return this.put(student, filesToUpload);
    }
    student.id = new Date().getMilliseconds();
    return this.post(student, filesToUpload);
  }

  // Add new Student
  private post(student: Student, filesToUpload: File): Promise<Student> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('filesToUpload  ',filesToUpload);
    return this.http
      .post(`${this.studentsUrl}/add`, JSON.stringify(student), { headers: headers })
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  // Update existing Student
  private put(student: Student, filesToUpload: File): Promise<Student> {

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

  search(term: string, parishId: number, effectiveDate: string): Promise<Array<Student>> {
    return this.http.get(`${this.studentsUrl}/search/${term}/${parishId}/${effectiveDate}`)
      .toPromise()
      .then((response) => {
        return response.json() as Array<Student>;
      })
      .catch(this.handleError);
  }

  uploadImage(filesToUpload: File, studentId: string): Observable<any>{
    let headers = new Headers();
    headers.set('id', studentId);
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Upload-Content-Type', filesToUpload.type)
    let options = new RequestOptions({ headers });
    return this.http.post(this.studentsUrl+'/image', filesToUpload, options)
                    .map(this.extractData)
                    .catch(this.extractError);
  }

  /**
   * Extracts the response from the API response.
   */ 
  private extractData (res: Response) {
    let body = res.json();
    return body.response || { };
}

private extractError (res: Response) {
    let errMsg = 'Error received from the API';
    return errMsg;
}

}
