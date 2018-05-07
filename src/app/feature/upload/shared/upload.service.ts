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
     headers.append('type', type);
     return this.httpClient.get<Array<Upload>>(`${this.api}/list`, { headers });
  }

  uploadFile(filesToUpload: File, type: string, agencyId: number, projectId: number, parishId:number): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("file", filesToUpload, filesToUpload.name);
    let url;
    if('student' === type){
      url= `${this.api}/upload/type/${agencyId}/${projectId}`;
    }else if('sponsot' === type){
      url= `${this.api}/upload/type/${parishId}`;
    }else{
      console.log(' Unsupported File Type');
    }
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text'
    });    
    return this.httpClient.request(req);
  }
}
