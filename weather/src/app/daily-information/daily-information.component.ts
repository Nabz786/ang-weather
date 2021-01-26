import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-information',
  templateUrl: './daily-information.component.html',
  styleUrls: ['./daily-information.component.css'],
})
export class DailyInformationComponent {

  @Input() dayOfTheWeek: string;

  constructor() { }

}
