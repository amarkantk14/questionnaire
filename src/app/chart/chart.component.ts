import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Result} from '../models';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnChanges {
  @Input() result: Result[] = [];
  @Input() show: Boolean = false;
  
  id: string = 'Cricket-trivia-report-chart';
  width: number = 400;
  height: number = 200;
  type: string = 'column2d';
  dataFormat: string = 'json';
  dataSource: any;
  title: string = 'Cricket Trivia Report Chart';

  chartConfig: Object = {
		"caption": "Cricket Trivia Report Chart",
    "subCaption": "Cricket Trivia analysis",
    "numberprefix": "",
    "theme": "fint",
    "yaxismaxvalue": "5",
    "yaxisminvalue": "0",
    "showHoverEffect": "1"
  };

  constructor() { }

  ngOnChanges() {
    this.dataSource = {
      "chart": {...this.chartConfig},
      "data": this.show === true ? this.result : []
    }
  }
}