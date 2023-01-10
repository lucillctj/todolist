import { Component, OnInit, Output, EventEmitter, AfterViewChecked, SimpleChanges, Input } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable, tap } from 'rxjs';
import { Task } from 'app/models/todolist';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  todos$: Observable<Task[]>;
  task$: Observable<Task>;

  @Output() taskId = new EventEmitter<number>();
  @Output() taskIdUpdate = new EventEmitter<number>();
  @Output() createTask = new EventEmitter<boolean>();
  @Input() clickTaskUpdate: boolean;
  @Input() clickTaskCreate: boolean;

  constructor(private appHttpService: AppHttpService) { }

  selectTaskToGet(taskId: number) {
    this.taskId.emit(taskId);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    if((this.clickTaskUpdate=true) || (this.clickTaskCreate=true)){
    this.todos$ = this.appHttpService.getAllTodos();
    console.log('update a fonctionnée !');
    }else {
      this.todos$ = this.appHttpService.getAllTodos();
      console.log('update a pas fonctionnée !');
    }
  }

  selectTaskToUpdate(taskIdUpdate: number) {
    this.taskIdUpdate.emit(taskIdUpdate);
    // if (this.clickTaskUpdate=true){
    //   this.refresh();
    // }
  }

  // selectClickUpdate(clickTaskUpdate: boolean){
  //   if (clickTaskUpdate=true){
  //     this.refresh()
  //   }else{
  //     console.log('error')
  //   }
  // }

  selectToCreateTask(createTask: boolean) {
    this.createTask.emit(createTask = true);
  }

  selectTaskToDelete(taskId: number): void {
    this.appHttpService.deleteTask(taskId).subscribe(() => this.refresh());
  }
};

