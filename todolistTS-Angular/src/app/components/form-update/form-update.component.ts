import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
import { Task } from 'app/models/todolist';
import { identifierName } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnChanges {
  task$: Observable<Task>;
  @ViewChild('taskUpdate') form: NgForm;

  @Input() taskIdUpdate: number;

  constructor(private appHttpService: AppHttpService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.task$ = this.appHttpService.getTaskById(changes['taskIdUpdate'].currentValue);
  }

  updateTask(data: Task) {
    this.appHttpService.updateTaskById(this.taskIdUpdate, data)
      .subscribe(data => this.taskIdUpdate = data.id);
      console.log(this.form);
      
    
  }
}
