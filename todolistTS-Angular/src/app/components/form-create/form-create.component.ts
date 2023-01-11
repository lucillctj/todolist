import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'app/models/todolist';
import { AppHttpService } from 'app/services/app-http.service';

@Component({
  selector: 'form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent {
  @ViewChild('taskCreate') form: NgForm;
  @Input() createTask: boolean; //reçoit event depuis home
  @Output() clickCreate: EventEmitter<boolean> = new EventEmitter(); //envoi event à home
  

  constructor(private appHttpService: AppHttpService) { }


  createNewTask(data: Task) {
    this.appHttpService.createTask(data)
      .subscribe();
    this.clickCreate.emit();
  }
}
