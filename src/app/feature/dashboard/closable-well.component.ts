import { Component, Input } from '@angular/core';

@Component({
  selector: 'closable-well',
  template: `
<div class="well" >
  <p (click)="visible=!visible"> {{maxOut.name}} : {{maxOut.data.length}} </p>
  
  <ng-content *ngIf="visible"></ng-content>
  
</div>
  `
})
export class ClosableWellComponent {

  @Input() maxOut;

  visible: boolean = false;


}