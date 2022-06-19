import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getDatabase, ref, child, get } from "firebase/database";
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  constructor(firebase: FirebaseApp) {
    const db = getDatabase(firebase);
    const myRef = ref(db,);
    get(child(myRef, "/day")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }
  // applyLightTheme() {
  //   this.basicOptions = {
  //       plugins: {
  //           legend: {
  //               labels: {
  //                   color: '#495057'
  //               }
  //           }
  //       },
  //       scales: {
  //           x: {
  //               ticks: {
  //                   color: '#495057'
  //               },
  //               grid: {
  //                   color: '#ebedef'
  //               }
  //           },
  //           y: {
  //               ticks: {
  //                   color: '#495057'
  //               },
  //               grid: {
  //                   color: '#ebedef'
  //               }
  //           }
  //       }
  //   };
  // }

}
