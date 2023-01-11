import { Component, ViewChild } from '@angular/core';
import { TodolistComponent } from 'app/components/todolist/todolist.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  taskId: number; //valeur de l'event depuis todolist
  taskIdUpdate: number; //valeur de l'event depuis todolist
  createTask: boolean; //valeur de l'event depuis todolist

  @ViewChild(TodolistComponent) todolist: TodolistComponent;

  showTaskDetails(taskId: number) { //reçoit de todolist et redirige vers aperçu
    this.taskId = taskId;
  }
  showTaskToUpdate(taskIdUpdate: number) { // reçoit de todolist et redirige vers modif
    // console.log(taskIdUpdate);
    this.taskIdUpdate = taskIdUpdate;
  }

  createNewTask() { //reçoit de todolist et redirige vers création
    this.createTask = true;
  }

  updateListNew() { //méthode utilisée lors du clickCreate
    this.todolist.refresh();
  }

  updateList() { //méthode utilisée lors du clickUpdate
    this.todolist.refresh();
  }
};