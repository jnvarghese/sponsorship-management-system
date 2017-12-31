import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { JQ_TOKEN, SponsorService, StudentService } from '../index';
import { Sponsor, Student } from '../model/index';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  selectedSponsor: Sponsor;
  selectedStudent: Student;
  sponsers: Observable<Sponsor[]>;
  students: Observable<Student[]>;
  private sponsorSearchTerms = new Subject<string>();
  private studentSearchTerms = new Subject<string>();

  constructor(private sponsorService: SponsorService<Sponsor>,
    private studentService: StudentService,
     @Inject(JQ_TOKEN) private $: any) { }
  @ViewChild('modalcontainer') containerEl: ElementRef;

  ngOnInit() {
    this.sponsers = this.sponsorSearchTerms
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

     this.students = this.studentSearchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.studentService.search(term)
        // or the observable of empty sponsor if no search term
        : Observable.of<Student[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Student[]>([]);
      });

      let jQ = this.$;
      jQ(document).ready(function () {
             var navListItems = jQ('div.row div a'),
                allWells = jQ('.setup-content'),
                allNextBtn = jQ('.nextBtn');
            allWells.hide();
            navListItems.click(function (e) {
                e.preventDefault();
                var $target = jQ(jQ(this).attr('href')),
                    $item = jQ(this);
                if (!$item.hasClass('disabled')) {
                    navListItems.removeClass('btn-success').addClass('btn-default');
                    $item.addClass('btn-success');
                    allWells.hide();
                    $target.show();
                    $target.find('input:eq(0)').focus();
                }
            });
            allNextBtn.click(function () {
                var curStep = jQ(this).closest(".setup-content"),
                    curStepBtn = curStep.attr("id"),
                    nextStepWizard = jQ('div.row div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                    curInputs = curStep.find("input[type='text'],input[type='url']"),
                    isValid = true;
                jQ(".form-group").removeClass("has-error");
                for (var i = 0; i < curInputs.length; i++) {
                    if (!curInputs[i].validity.valid) {
                        isValid = false;
                        jQ(curInputs[i]).closest(".form-group").addClass("has-error");
                    }
                }
                if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
            });
            jQ('div.row div a.btn-success').trigger('click');
        });
  }

  searchSponsor(term: string): void {
    // Push a search term into the observable stream.
    this.sponsorSearchTerms.next(term);
  }

  searchStudent(term: string): void {
    // Push a search term into the observable stream.
    this.studentSearchTerms.next(term);
  }

  selectSponsor(sponsor: Sponsor){
    console.log(sponsor);
  }

  selectStudent(student: Student){
    console.log(student);
  }

}
