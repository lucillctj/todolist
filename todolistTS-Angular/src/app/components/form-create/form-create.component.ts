import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'app/models/todolist';
import { AppHttpService } from 'app/services/app-http.service';
import { NgForm } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  @ViewChild('taskCreate') form: NgForm;
  @Input() createTask: boolean;
  // @Output() clickTaskCreate = new EventEmitter<boolean>();
  

  constructor(private appHttpService: AppHttpService) { }

  ngOnInit(): void {

  }

  createNewTask(data: Task) {
    // this.clickTaskCreate.emit(clickTaskCreate=true);
    this.appHttpService.createTask(data)
      .subscribe();
  }
}
