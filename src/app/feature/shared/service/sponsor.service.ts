import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sponsor, Enrollment, SponsorshipInfo } from "../../model";

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

@Injectable()
export class SponsorService<T> {

  private sponsorUrl = 'api/sponsor';  // URL to web api

  constructor(private http: HttpClient) { }

  getSponsors() {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/list`);
  }

  getSponsorsByParishId(id: number) {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/listbyparish/${id}`);
  }

  findSponsor(id: number) {
    return this.http.get<T>(`${this.sponsorUrl}/find/${id}`);
  }

  save(sponsor: Sponsor, id: number) {
    if (id) {
      sponsor.id = id;
      return this.put(sponsor);
    }
    return this.post(sponsor);
  }

  private post(sponsor: Sponsor) {
    return this.http
      .post<Sponsor>(`${this.sponsorUrl}/add`, JSON.stringify(sponsor), { headers });
  }

  private put(sponsor: Sponsor) {
    return this.http.put<Sponsor>(`${this.sponsorUrl}/modify/${sponsor.id}`, JSON.stringify(sponsor), { headers });
  }

  search(term: string) {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/search/${term}`);
  }

  getSponsorShipInfo(id: number) {
    return this.http.get<SponsorshipInfo>(`/api/manage/view/${id}`);
  }

}
