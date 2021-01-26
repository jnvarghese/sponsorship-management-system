import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sponsor, Enrollment, SponsorshipInfo, Contribution, Student } from "../../model";
import { MaxOutSponsor } from "../../model/maxoutsponsor";

const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

@Injectable()
export class SponsorService<T> {

  private sponsorUrl = 'api/sponsor';  // URL to web api

  constructor(private http: HttpClient) { }

  getMaxOutSponsorship(){
    return this.http.get<Array<MaxOutSponsor>>(`${this.sponsorUrl}/maxout/xxx/xxx`);
  }

  getSponsors() {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/list`);
  }

  getSponorReceiptsByReceiptId(receiptId: number) {
      return this.http.get<Array<T>>(`${this.sponsorUrl}/receipts/${receiptId}`)
  }

  getSponsorsByFirstNameAndLastNameAndParishId(firstName: String, lastName: string, parishId: number) {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/list/${firstName}/${lastName}/${parishId}`);
  }

  getSponsorsByDemography(firstName:string, lastName :string, street:string, 
                          city: string, state: string, zipcode:string) {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/listByDemography/${firstName}/${lastName}/${street}/${city}/${state}/${zipcode}`);
  }

  getSponsorsByParishId(id: number) {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/listbyparish/${id}`);
  }

  getEnrolledStudentsBySponsorId(id: number) {
    return this.http.get<Array<Student>>(`${this.sponsorUrl}/${id}/students`);
  }

  getSequence(id: number) {
    return this.http.get(`${this.sponsorUrl}/sequence/${id}`);
  }

  findSponsor(id: number) {
    return this.http.get<T>(`${this.sponsorUrl}/find/${id}`);
  }

  findSponsorParishIdAndSponsorCode(id: number, sponsorCode: string) {
    return this.http.get<T>(`${this.sponsorUrl}/find/${id}/${sponsorCode}`);
  }

  save(sponsor: Sponsor) {
    if (sponsor.id) {
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

  searchByParishId(id: number, term: string) {
    return this.http.get<Array<T>>(`${this.sponsorUrl}/search/${term}/parish/${id}`);
  }


  searchSponsor(payload) {
    return this.http
      .post<Array<Sponsor>>(`${this.sponsorUrl}/searchsponsor`, JSON.stringify(payload), { headers });
  }

  getSponsorShipInfo(id: number) {
    return this.http.get<SponsorshipInfo[]>(`/api/manage/view/${id}`);
  }

  getContributionDetail(sponsorId: number, studentId: number){
    return this.http.get<Contribution[]>(`/api/manage/viewcontribution/${sponsorId}/${studentId}`);
  }

}
