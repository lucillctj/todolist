import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
import { Task } from 'app/models/todolist';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  todos$!: Observable<Task[]>;
  
  constructor(private appHttpService: AppHttpService) { }

  ngOnInit(): void {
      this.todos$ = this.appHttpService.getAllTodos();
  }

  getTaskDetail(): void {
    this.todos$.forEach;
    
    
  }
};
