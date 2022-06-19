import { Component, ViewChild, OnInit } from '@angular/core';
// import { Database, getDatabase, onValue, ref, set } from '@angular/fire/database';
// import { Chart } from 'chart.js';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gas-Sensor';
  // date: any;
  // time: any;
  // timeList: any[] = [];
  // gasList: any[] = [];
  // data: any;
  // data_Graph: any;
  // showAudio !: boolean;
  // constructor(public database: Database) {
  //   this.data_Graph = {
  //     labels: [],
  //     datasets: [
  //       {
  //         label: 'Gas (%)',
  //         data: [],
  //         fill: false,
  //         borderColor: '#42A5F5',
  //         tension: .4
  //       },

  //     ]
  //   }
    
  //   const db = getDatabase();
  //   const myRef = ref(db,);
  //   onValue(myRef, (snapshot) => {
   
  //     this.data = snapshot.val();
  //     this.checkGas();
  //     var current = new Date();
  //     this.date = current.toLocaleDateString();
  //     let temp = this.date.split("/");
  //     // console.log(temp);
  //     this.time = current.toLocaleTimeString();

  //     if (this.timeList.length < 10 && this.gasList.length < 10) {
  //       this.timeList.push(this.time);
  //       this.gasList.push(this.data.Gas);
  //       if (this.timeList[this.timeList.length - 2] == this.timeList[this.timeList.length - 1] && this.gasList[this.gasList.length - 2] == this.gasList[this.gasList.length - 1]) {
  //         this.timeList.pop();
  //         this.gasList.pop();
  //       }
  //     }
  //     else if (this.timeList.length == 10 && this.gasList.length == 10) {

  //       this.timeList.push(this.time);
  //       this.gasList.push(this.data.Gas);
  //       if (this.timeList[this.timeList.length - 2] == this.timeList[this.timeList.length - 1] && this.gasList[this.gasList.length - 2] == this.gasList[this.gasList.length - 1]) {
  //         this.timeList.pop();
  //         this.gasList.pop();
  //       }
  //       else {
  //         this.timeList.shift();
  //         this.gasList.shift();
  //       }
  //     }
  //     this.update();
    
  //     console.log(this.data.Gas);
  //     console.log(this.timeList, this.gasList);
  //     set(ref(db, '/day/' + temp[0] + '-' + temp[1] + '-' + temp[2] + '/time/' + this.time), {
  //       gas: this.data.Gas,
  //       time: this.time,
  //       day: this.date

  //     });

  //   })

  // }

  // checkGas(){
  //   if(Number(this.data.Gas) >= 30){
  //     this.showAudio = true;
  //     console.log("cháy and chạy");
  //   }else{
  //     this.showAudio = false;
  //     console.log("hehe");
  //   }
    
  // }
  // update() {
  //   if(Number(this.data.Gas) >= 30){
  //     this.data_Graph = {
  //       labels: this.timeList,
  //       datasets: [
  //         {
  //           label: 'Gas (%)',
  //           data: this.gasList,
  //           fill: false,
  //           borderColor: '#FFA726',
  //           tension: .4
  //         },
  
  //       ]
  //     }
  //   }else if(Number(this.data.Gas) >= 10 && Number(this.data.Gas) < 30){
  //     this.data_Graph = {
  //       labels: this.timeList,
  //       datasets: [
  //         {
  //           label: 'Gas (%)',
  //           data: this.gasList,
  //           fill: false,
  //           borderColor: '#42A5F5',
  //           tension: .4
  //         },
  
  //       ]
  //     }
     
  //   } else{
  //     this.data_Graph = {
  //       labels: this.timeList,
  //       datasets: [
  //         {
  //           label: 'Gas (%)',
  //           data: this.gasList,
  //           fill: false,
  //           borderColor: '#00bb7e',
  //           tension: .4
  //         },
  
  //       ]
  //     }
  //   }
 
  // }

}
