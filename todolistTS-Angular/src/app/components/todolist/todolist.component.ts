import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
import { Task } from 'app/models/todolist';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {
  todos$!: Observable<Task[]>;
  
  constructor(private appHttpService: AppHttpService) { }

  ngOnInit(): void {
      this.todos$ = this.appHttpService.getAllTodos();
  }

  openTaskDetails() {
    console.log(TaskComponent.name);
  }
  // selectedTask!: Task;
  // onSelect(todos$: Task): void {
  //   this.selectedTask = todos$;
  // }
};