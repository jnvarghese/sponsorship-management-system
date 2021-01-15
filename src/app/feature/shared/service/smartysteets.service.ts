import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SmartySteetsService {
    
   private steetLookupApi = 'api/street';  // URL to web api

  constructor(private http: HttpClient) { }

  getStreetSuggestions(term: any) {
    return this.http.get<Array<any>>(`${this.steetLookupApi}/lookup/${term}`);
  }

    
}