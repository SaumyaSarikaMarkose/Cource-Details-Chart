import { Component, OnInit } from '@angular/core';
import { CourceChartsService } from '../../services/cource-charts.service';
declare var google: any;
import {MonthwiseData } from '../../models/models';

@Component({
  selector: 'app-course-status',
  templateUrl: './course-status.component.html',
  styleUrls: ['./course-status.component.css']
})
export class CourseStatusComponent implements OnInit {

  courceData: any[] = [];
  // monthwiseDta: any;
  monthwiseDta: MonthwiseData[] = []; 
  

  constructor(private courceDataService : CourceChartsService) { }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart());
    this.fetchCourceData();
  }
  fetchCourceData(): void {
    this.courceDataService.getcourceData().subscribe(response => {
      console.log("Fetched Data:", response);
      this.courceData = response[0];
      this.monthwiseDta = response[1];
      this.drawChart(); 
    });
  }

  drawChart(): void {
    this.drawPieChart();
    this.drawBarChart();
  }
  drawPieChart(): void {
    // if (!this.courceData || this.courceData.length === 0) {
    //   console.error('No course data available');
    //   return;
    // }

    // Prepare data for Google Charts
    const chartData = [['Course', 'Enrollment Count']];
    this.courceData.forEach(item => {
      
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

  // drawBarChart(): void {
  //   console.log("nnnnnnnnnnnnnnn")
   
  //   const chartData = [['Month', 'Student Count']];
  //   console.log("IIIIIIIiiiii",chartData)
  //   this.monthwiseDta.forEach((item:any) => {
  //     console.log("IIIIIII",item)
  //     chartData.push([item.Month, item.Student_Count]);
  //   });
  //   console.log("IIsasdasIIIII",chartData)
  //   const data = google.visualization.arrayToDataTable(chartData);

  //   const options = {
  //     title: 'Month Wise Student Enrollment',
  //     hAxis: { title: 'Month' },
  //     vAxis: { title: 'Student Count' }
  //   };

  //   const chart = new google.visualization.BarChart(document.getElementById('barchart') as HTMLElement);
  //   chart.draw(data, options);
  // }
  drawBarChart(): void {
    console.log("Drawing Bar Chart");
  
    // Check if monthwiseDta is available
    if (!this.monthwiseDta || this.monthwiseDta.length === 0) {
      console.error('No month-wise data available');
      return;
    }
  
    // Prepare data for Google Charts
    const chartData = [['Month', 'Student Count']];
    console.log("Initial Chart Data", chartData);
  
    this.monthwiseDta.forEach((item: any) => {
      console.log("Item Data", item);
      chartData.push([item.Month, Number(item.Student_Count)]); // Ensure numeric value
    });
  
    console.log("Final Chart Data", chartData);
  
    // Convert to DataTable
    const data = google.visualization.arrayToDataTable(chartData);
  
    // Chart options
    const options = {
      title: 'Month Wise Student Enrollment',
      hAxis: { title: 'Month' },
      vAxis: { title: 'Student Count' }
    };
  
    // Get chart container and draw chart
    const container = document.getElementById('barchart') as HTMLElement;
    if (container) {
      const chart = new google.visualization.BarChart(container);
      chart.draw(data, options);
    } else {
      console.error('Bar chart container not found');
    }
  }
  

}
