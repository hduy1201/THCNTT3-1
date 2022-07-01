import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';

import { getDatabase, ref, child, get } from "firebase/database";
import { Gas_Detail } from 'src/app/models/gas.model';
import { HistoryService } from 'src/app/services/history.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  day: string = "";
  hour: any;
  tempList: Array<Gas_Detail> = [];
  timeList: any[] = [];
  gasList: any[] = [];
  values : any[] = [];
  
  toTimestamp(dayString: string, time: string) {
    let day = dayString.split('/');
    let cvt_day = day[1] + "/" + day[0] + "/" + day[2];
    let currentTimestamp = Date.parse(cvt_day + " " + time) / 1000;
    return currentTimestamp;
  }

  constructor(firebase: FirebaseApp, private his: HistoryService) {
    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'Gas(%)',
          backgroundColor: '#42A5F5',
          data: []
        },
      ]
    };
    
    this.day = this.his.getDay();
    let temp = this.day.split("/");
    let cvt_Day = temp[0] + "-" + temp[1] + "-" + temp[2];
    console.log(cvt_Day);
    const db = getDatabase(firebase);
    const myRef = ref(db,);



    get(child(myRef, `/day/${cvt_Day}/time`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.tempList.push(snapshot.val());
        let convertArr = Object.values(this.tempList.flat()[0]);
        console.log(convertArr);
        let currentTimestamp = this.toTimestamp(convertArr[0].day, "00:00:00");
        console.log(currentTimestamp);
        const HOURS_OF_DAY = 24 * 60 * 60;
        const TWO_HOURS = 2 * 60 * 60;
        const FULLDAY_TIMESTAMP = currentTimestamp + HOURS_OF_DAY;
        
        console.log(FULLDAY_TIMESTAMP)
        let currentDataIndex = 0;
        while (currentTimestamp < FULLDAY_TIMESTAMP) {
          console.log(currentTimestamp);
          let totalGas = 0;
          let totalGasCount = 0;
          while (currentDataIndex < convertArr.length) {
            let timestamp = this.toTimestamp(convertArr[currentDataIndex].day, convertArr[currentDataIndex].time);
            if (currentTimestamp <= timestamp && timestamp < currentTimestamp + TWO_HOURS) {
              totalGas += parseInt(convertArr[currentDataIndex].gas);
              totalGasCount++;
              currentDataIndex++;
            }
            else {
              if (totalGasCount == 0) {
                totalGasCount = 1;
              }
              break;

            }
          }
          let avg_gas = totalGas / totalGasCount;
          if (avg_gas == NaN || avg_gas == Infinity) {
            this.values.push(0);
          }
          else {
            this.values.push(Math.round(avg_gas));
          }
          currentTimestamp += TWO_HOURS;
        }

        console.log(this.values);
      }
      this.update();
    });
    
  }

  ngOnInit(): void {  

  }

  update() {
    this.basicData = {
      labels: [2,4,6,8,10,12,14,16,18,20,22,24],
      datasets: [
        {
          label: 'Gas (%)',
          data: this.values,
          backgroundColor: '#FFA726',
        },

      ]

    }
  }


}





