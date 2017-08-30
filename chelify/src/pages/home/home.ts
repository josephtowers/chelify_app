import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('doughnutCanvas') doughnutCanvas;
 
    doughnutChart: any;
 
    constructor(public navCtrl: NavController) {
 
    }
 
    ionViewWillEnter() {
 
        
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Comida", "Porno", "Servicios", "Transferencias", "Educación", "Supermercado"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            },
            options: {
                legend: {
                    position: 'bottom'
                },
                animation: {
                    animateScale: true
                }
            }
        
        
    
 
        });
 
        
    }
}
