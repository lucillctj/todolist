import { Component, OnInit, Output, EventEmitter, AfterViewChecked, SimpleChanges, Input } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable, tap } from 'rxjs';
import { Task } from 'app/models/todolist';


@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {
  todos$: Observable<Task[]>;
  task$: Observable<Task>;

  @Output() taskId = new EventEmitter<number>();
  @Output() taskIdUpdate = new EventEmitter<number>();
  @Output() createTask = new EventEmitter<boolean>();

  constructor(private appHttpService: AppHttpService) { }

  selectTaskToGet(taskId: number) {
    this.taskId.emit(taskId);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.todos$ = this.appHttpService.getAllTodos();
    console.log('coucou');
  }

  selectTaskToUpdate(taskIdUpdate: number) {
    this.taskIdUpdate.emit(taskIdUpdate);
  }

  selectToCreateTask(createTask: boolean) {
    this.createTask.emit(createTask = true);
  }

  selectTaskToDelete(taskId: number): void {
    // this.appHttpService.deleteTask(taskId)
    //   .pipe(
    //     tap(() => {
    //       this.refresh()
    //     })
    //   ).subscribe();
    this.appHttpService.deleteTask(taskId).subscribe(() => this.refresh());
  }
};

