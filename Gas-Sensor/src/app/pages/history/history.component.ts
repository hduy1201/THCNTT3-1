import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AnyForUntypedForms } from '@angular/forms';
import { getDatabase, ref, child, get, onChildAdded } from "firebase/database";
import { Gas_Detail } from 'src/app/models/gas.model';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  basicData: any;
  basicOptions: any;
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

  constructor(firebase: FirebaseApp) {
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
    
    const db = getDatabase(firebase);
    const myRef = ref(db,);



    get(child(myRef, "/day/23-6-2022/time")).then((snapshot) => {
      if (snapshot.exists()) {
        this.tempList.push(snapshot.val());
        let convertArr = Object.values(this.tempList.flat()[0]);
        // let current: number = 0;
        let timeline: number = 0;
        let total: number = 0;
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

  //   for (let i = 0; i < convertArr.length; i++) {

  //     console.log(convertArr[i]);
  //     let day = convertArr[i].day.split("/");
  //     let cvt_day = day[1] + "/" + day[0] + "/" + day[2];

  //     if(toTimestamp(cvt_day + " " + convertArr[i].time) > timeline + (2*60*60*1000)){
  //       console.log(total);

  //       timeline += 2*60*60*1000; 
  //       const date = new Date(timeline*1000);
  //       this.timeList.push(date.toLocaleTimeString());
  //       console.log(this.gasList,this.timeList);
  //     }
  //     if (timeline <= toTimestamp(cvt_day + " " + convertArr[i].time) && timeline + (2*60*60*1000) >= toTimestamp(cvt_day + " " + convertArr[i].time)) {
  //       total += Number(convertArr[i].gas);
  //     }

  //     // console.log(toTimestamp(cvt_day + " " + convertArr[i].time));
  //     // console.log(toTimestamp('6/17/2022 16:18:51'));
  //     // console.log(toTimestamp('02/13/2020 23:31:30'));
  //   }
  // } else {
  //   console.log("No data available");
  // }
  // }).catch((error) => {
  //   console.error(error);
  // });


  // onChildAdded(child(myRef, "/day/17-6-2022/time"), (data) => {
  //    this.tempList.push(data.val());
  //    this.convert(this.tempList);
  // });



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





