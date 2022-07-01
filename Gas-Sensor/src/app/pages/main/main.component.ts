import { Component, OnInit } from '@angular/core';
import { Database, get, getDatabase, onValue, ref, set } from '@angular/fire/database';
import { HttpService } from 'src/app/services/http.service';
import { Gas_Detail } from 'src/app/models/gas.model';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/services/history.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  ELEMENT_DATA: Gas_Detail[] = [];
  displayedColumns: string[] = ['day', 'time', 'gas'];


  musicFileNamesList: string[] = [];
  randomMusicFileName !: string;

  date: any;
  time: any;
  timeList: string[] = [];
  gasList: string[] = [];
  data: any;
  data_Graph: any;
  showAudio !: boolean;

  tempList: Array<Gas_Detail> = [];
  dayList: string[] = [];
  constructor(public database: Database, private http: HttpService, private route: Router, private his: HistoryService) {

    this.getData('api/music');

    this.data_Graph = {
      labels: [],
      datasets: [
        {
          label: 'Gas (%)',
          data: [],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },

      ]
    }

    const db = getDatabase();
    const myRef = ref(db,);


    get(myRef,).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        this.tempList.push(snapshot.val().day);
        let convertArr = Object.values(this.tempList.flat()[0]);
        // console.log(convertArr[0].time);
        for (let i = 0; i < convertArr.length; i++) {

          let convertArr1: Array<Gas_Detail> = Object.values(convertArr[i].time);
          this.dayList.push(convertArr1[0].day);
        }
        console.log(this.dayList);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });


    onValue(myRef, (snapshot) => {

      this.data = snapshot.val();
      this.checkGas();
      var current = new Date();
      this.date = current.toLocaleDateString();
      let temp = this.date.split("/");
      // console.log(temp);
      this.time = current.toLocaleTimeString();

      if (this.timeList.length < 10 && this.gasList.length < 10) {
        this.timeList.push(this.time);
        this.gasList.push(this.data.Gas);
        if (this.timeList[this.timeList.length - 2] == this.timeList[this.timeList.length - 1] && this.gasList[this.gasList.length - 2] == this.gasList[this.gasList.length - 1]) {
          this.timeList.pop();
          this.gasList.pop();
        }
      }
      else if (this.timeList.length == 10 && this.gasList.length == 10) {

        this.timeList.push(this.time);
        this.gasList.push(this.data.Gas);
        if (this.timeList[this.timeList.length - 2] == this.timeList[this.timeList.length - 1] && this.gasList[this.gasList.length - 2] == this.gasList[this.gasList.length - 1]) {
          this.timeList.pop();
          this.gasList.pop();
        }
        else {
          this.timeList.shift();
          this.gasList.shift();
        }
      }
      this.ELEMENT_DATA.shift();
      this.ELEMENT_DATA.push({
        day: this.date,
        time: this.time,
        gas: this.data.gas,

      });
      this.update();

      console.log(this.data.Gas);
      console.log(this.timeList, this.gasList);
      set(ref(db, '/day/' + temp[0] + '-' + temp[1] + '-' + temp[2] + '/time/' + this.time), {
        gas: this.data.Gas,
        time: this.time,
        day: this.date

      });

    })



  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  checkGas() {
    if (Number(this.data.Gas) >= 30) {
      this.showAudio = true;
      console.log("cháy and chạy");
    } else {
      this.showAudio = false;
      console.log("không cháy");
    }

  }
  update() {
    if (Number(this.data.Gas) >= 30) {
      this.data_Graph = {
        labels: this.timeList,
        datasets: [
          {
            label: 'Gas (%)',
            data: this.gasList,
            fill: false,
            borderColor: '#FFA726',
            tension: .4
          },

        ]
      }
    } else if (Number(this.data.Gas) >= 10 && Number(this.data.Gas) < 30) {
      this.data_Graph = {
        labels: this.timeList,
        datasets: [
          {
            label: 'Gas (%)',
            data: this.gasList,
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          },

        ]
      }

    } else {
      this.data_Graph = {
        labels: this.timeList,
        datasets: [
          {
            label: 'Gas (%)',
            data: this.gasList,
            fill: false,
            borderColor: '#00bb7e',
            tension: .4
          },

        ]
      }
    }

  }
  public async getData(apiPath: string) {
    return (await this.http.getMusicFileNames(apiPath)).subscribe(value => {
      this.musicFileNamesList = value;
      // console.log(this.musicFileNamesList);
      const random = Math.floor(Math.random() * this.musicFileNamesList.length);
      this.randomMusicFileName = this.musicFileNamesList[random];
      console.log(this.randomMusicFileName);
    });
  }

  public nextPage(day:string){
    this.his.goToHisPage(day);
  }



}
