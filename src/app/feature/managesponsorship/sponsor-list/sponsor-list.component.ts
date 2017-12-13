import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Sponsor } from '../../model/index';
import { Subject } from 'rxjs/Subject';
import { SponsorService } from '../../shared/service/sponsor.service';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {

  sponsers: Observable<Sponsor[]>;

  private searchTerms = new Subject<string>();

  constructor(private sponsorService: SponsorService) {}

  ngOnInit() {
    this.sponsers = this.searchTerms
    .debounceTime(300)        // wait for 300ms pause in events
    .distinctUntilChanged()   // ignore if next search term is same as previous
    .switchMap(term => term   // switch to new observable each time
      // return the http search observable
      ? this.sponsorService.search(term)
      // or the observable of empty sponsor if no search term
      : Observable.of<Sponsor[]>([]))
    .catch(error => {
      // TODO: real error handling
      console.log(`Error in component ... ${error}`);
      return Observable.of<Sponsor[]>([]);
    });
  }
  searchSponsor(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }
}
