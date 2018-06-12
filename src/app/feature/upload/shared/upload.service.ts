import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Upload } from '../../model/upload';
import { Observable } from 'rxjs/Observable';
import { Initiative } from '../../model';

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
@Injectable()
export class UploadService {

  private api = 'api';

  constructor(private httpClient: HttpClient) { }

  listInitiative(){
    return this.httpClient.get<Array<Initiative>>(`${this.api}/init/initiative/list`);
  }

  list(type: string){
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('type', type);   
     return this.httpClient.get<Array<Upload>>(`${this.api}/file/list`, { headers });
  }

  uploadFile(filesToUpload: File, type: string, id: number, initiativeId?: string): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("file", filesToUpload, filesToUpload.name);
    formData.append("userId", localStorage.getItem('userId') || '0');
    formData.append("initiativeId", initiativeId || '1');
    let url;   
    url= `${this.api}/file/upload/${type}/${id}`;
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text'
    });    
    return this.httpClient.request(req);
  }
}
