import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { JQ_TOKEN, SponsorService } from '../index';
import { Sponsor } from '../model/index';
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

  sponsers: Observable<Sponsor[]>;
  private searchTerms = new Subject<string>();

  constructor(private sponsorService: SponsorService, @Inject(JQ_TOKEN) private $: any) { }
  @ViewChild('modalcontainer') containerEl: ElementRef;

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
    this.searchTerms.next(term);
  }

}
