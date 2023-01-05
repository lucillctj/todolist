import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
import { Task } from 'app/models/todolist';

@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {
  todos$: Observable<Task[]>;

  @Output() taskId = new EventEmitter<number>();


  constructor(private appHttpService: AppHttpService) { }

  selectTask(taskId: number) {
    this.taskId.emit(taskId);
  }

  ngOnInit(): void {
    this.todos$ = this.appHttpService.getAllTodos();
  }
}

