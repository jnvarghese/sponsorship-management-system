import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { JQ_TOKEN } from '../index';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  constructor( @Inject(JQ_TOKEN) private $: any) { }
  @ViewChild('modalcontainer') containerEl: ElementRef;
  
  ngOnInit() {
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

}
