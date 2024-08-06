import { Component, OnInit } from '@angular/core';
import { CourceChartsService } from '../../services/cource-charts.service';
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  // courceData : any;
  // monthwiseDta : any;
  courceData: any[] = [];
  monthwiseDta: any;

  constructor(private courceDataService : CourceChartsService) { }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart());
    this.fetchCourceData();
  }

  drawChart(): void {
    // Check if courceData is available
    // if (!this.courceData || this.courceData.length === 0) {
    //   console.error('No course data available');
    //   return;
    // }

    // Prepare data for Google Charts
    const chartData = [['Course', 'Enrollment Count']];
    console.log("ccccccc",chartData)
    this.courceData.forEach(item => {
      console.log("IIIIIIIIIIIII",item)
      chartData.push([item.Course_Name, item.Enrollment_Count]);
    });

    const data = google.visualization.arrayToDataTable(chartData);

    const options = {
      title: 'Course Enrollment Count',
      pieHole: 0.4
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart') as HTMLElement);
    chart.draw(data, options);
  }

 
  fetchCourceData(): void {
    this.courceDataService.getcourceData().subscribe(response => {
      console.log("Fetched Data:", response);
      this.courceData = response[0];
      // this.monthwiseDta = response[1];
      this.drawChart(); 
    });
  }

}
