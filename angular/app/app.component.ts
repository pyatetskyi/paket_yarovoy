/// <reference path="jquery.d.ts" />

import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.css'
  ]
})
export class AppComponent implements OnInit{
  private zone: NgZone;
//  private basicOptions: Object;
  private options: Object;
  private progress: number = 0;
  //private response: any = {};
  private response: any[] = [];
  private responses: any[] = [];


  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.options = {
      url: 'http://localhost:8080/upload'
    };


    var val = 0;
    var $circle = $('#svg #bar');

    if (isNaN(val)) {
     val = 100;
    }
    else{
      var r = +$circle.attr('r');
      var c = Math.PI*(r*2);

      if (val < 0) { val = 0;}
      if (val > 100) { val = 100;}

      var pct = ((100-val)/100)*c;
      $circle.css({ strokeDashoffset: pct});
      $('#cont').attr('data-pct',val);
    }
  }

   handleMultipleUpload(data: any): void {
     let index = this.response.findIndex(x => x.id === data.id);
     if (index === -1) {
      this.response.push(data);
     } else {
       let total = 0, uploaded = 0;
       this.response.forEach(resp => {
         total += resp.progress.total;
         uploaded += resp.progress.loaded;
       });
       let percent = uploaded / (total / 100) / 100;

       this.zone.run(() => {
         this.response[index] = data;
        //  console.log(data);
         this.progress = percent;

         var val = this.progress * 100;
         var $circle = $('#svg #bar');

         if (isNaN(val)) {
          val = 0;
         }
         else{
           var r = +$circle.attr('r');
           var c = Math.PI*(r*2);

           if (val < 0) { val = 0;}
           if (val > 100) { val = 100;}

           var pct = ((100-val)/100)*c;

           $circle.css({ strokeDashoffset: pct});
           $('#cont').attr('data-pct',val.toFixed(0));
         }
       });
     }
   }

   handleUpload(data: any): void {
     this.zone.run(() => {
       this.response = data;
       this.progress = data.progress.percent / 100;
     });
   }
}
