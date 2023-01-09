import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  taskId: number;
  taskIdUpdate: number;
  createTask: boolean;
  clickTaskUpdate: boolean;

  showTaskDetails(taskId: number) {
    this.taskId = taskId;
  }

  showTaskToUpdate(taskIdUpdate: number){
    // console.log(taskIdUpdate);
    this.taskIdUpdate = taskIdUpdate;
  }

  createNewTask(createTask: boolean){
    this.createTask = createTask;
  }
};