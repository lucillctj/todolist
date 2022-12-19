import { Component, OnInit } from '@angular/core';
import { Task } from '../todolist';
import { ListService } from '../list.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  selectedTask?: Task;
  tasks: Task[] = [];

  constructor(private listService: ListService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
    this.messageService.add(`TodolistComponent: Selected task id=${task.id}`);
  }

  getTasks(): void {
    this.listService.getTasks()
        .subscribe(tasks => this.tasks = tasks);
  }
}