import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  taskId: number;

  showTaskDetails(taskId: number) {
    this.taskId = taskId;
  }
};