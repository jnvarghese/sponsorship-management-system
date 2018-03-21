import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class UploadService {

    private apiUri = 'api/upload';

    constructor(private http: HttpClient) { }

    uploadFile(filesToUpload: File, agencyId: number, projectId: number): Observable<HttpEvent<{}>>{
        let formData = new FormData();
        formData.append("file", filesToUpload, filesToUpload.name);
    
        const req = new HttpRequest('POST', `${this.apiUri}/${agencyId}/${projectId}`, formData, {
          reportProgress: true,
          responseType: 'text'
        });    
        return this.http.request(req);
      }

}