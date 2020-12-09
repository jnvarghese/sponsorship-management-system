import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Student } from '../../model/index';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { StudentService } from '../../shared/service/student.service';


@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {

  students: Observable<Array<Student>>;
  private searchTerms = new Subject<string>();
  searchType:string = 'name';

  search = { type: 'name'}

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.students = this.searchTerms
    .debounceTime(300)        // wait for 300ms pause in events
    .distinctUntilChanged()   // ignore if next search term is same as previous
    .switchMap(term => term   // switch to new observable each time
      // return the http search observable
      ? this.studentService.searchByType(term, this.search.type)
      // or the observable of empty sponsor if no search term
      : Observable.of<Array<Student>>([]))
    .catch(error => {
      // TODO: real error handling
      console.log(`Error in component ... ${error}`);
      return Observable.of<Array<Student>>([]);
    });
  }

  searchSponsor(term: string, searchType: string): void {
    // Push a search term into the observable stream.
    if( term.length>0 )
      this.searchTerms.next(term);
  }
}
