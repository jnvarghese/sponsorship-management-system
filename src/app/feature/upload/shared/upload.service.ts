import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Upload } from '../../model/upload';
import { Observable } from 'rxjs/Observable';

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
@Injectable()
export class UploadService {

  private api = 'api/file';

  constructor(private httpClient: HttpClient) { }

  list(type: string){
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('type', type);   
     return this.httpClient.get<Array<Upload>>(`${this.api}/list`, { headers });
  }

  uploadFile(filesToUpload: File, type: string, id: number): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("file", filesToUpload, filesToUpload.name);
    formData.append("userId", localStorage.getItem('userId') || '0');
    let url;   
    url= `${this.api}/upload/${type}/${id}`;
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text'
    });    
    return this.httpClient.request(req);
  }
}
