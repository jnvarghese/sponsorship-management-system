import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs as importedSaveAs } from "file-saver";
import { Renewal } from '../../model/renewal';
import { RenewalService } from '../../shared/service/renewal.service';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css']
})
export class RenewalComponent implements OnInit {

  renewals: Array<Renewal>;


  constructor(
    private renewalService: RenewalService) { }

  ngOnInit() {
    this.renewalService.list()
      .subscribe(
        data => {
          this.renewals = data
        },
        err => this.handleError
    );
  }
  
  generateRenewal(receiptId: number) {
    this.renewalService.generateLetter(receiptId).subscribe(
      blob => {
        importedSaveAs(blob, receiptId.toString());
      },
      () =>{
        console.log(' Downloaded. '); 
      }
    );
};
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
