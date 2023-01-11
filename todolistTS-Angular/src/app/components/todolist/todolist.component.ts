import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
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


  @Output() taskId = new EventEmitter<number>(); //envoi à home
  @Output() taskIdUpdate = new EventEmitter<number>(); //envoi à home
  @Output() createTask = new EventEmitter<boolean>(); //envoi à home
  @Input() clickTaskUpdate: boolean;

  @Input() clickCreate: EventEmitter<boolean>;
    

  constructor(private appHttpService: AppHttpService) { }

  ngOnInit(): void {
    if(this.clickCreate)
      this.clickCreate.subscribe(() => this.refresh())
    this.refresh();
  }

  refresh(): void {
    this.todos$ = this.appHttpService.getAllTodos();
    console.log('update a fonctionnée !');
  }

  selectGet(taskId: number) { //aller vers home pour aperçu
    this.taskId.emit(taskId);
  }
  selectUpdate(taskIdUpdate: number) { // aller vers home pour modif
    this.taskIdUpdate.emit(taskIdUpdate);
  }
  selectDelete(taskId: number): void { //supprimer
    this.appHttpService.deleteTask(taskId).subscribe(() => this.refresh());
  }
  selectCreate(createTask: boolean) { //aller vers home pour création
    this.createTask.emit(createTask = true);
  }
};

