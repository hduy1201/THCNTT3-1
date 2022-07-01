import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  temp : string = "";

  constructor(private route: Router) { }
  public goToHisPage(day: string){
    this.route.navigateByUrl("history");
    this.temp = day;
  }

  public getDay(){
    return this.temp;
  }
}
