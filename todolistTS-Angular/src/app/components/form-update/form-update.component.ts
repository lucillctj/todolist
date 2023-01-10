import { Component, Input, OnChanges, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
import { Task } from 'app/models/todolist';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnChanges {
  task$: Observable<Task>;
  @ViewChild('taskUpdate') form: NgForm;
  @Input() taskIdUpdate: number;
  @Output() clickTaskUpdate = new EventEmitter<boolean>();

  constructor(private appHttpService: AppHttpService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.task$ = this.appHttpService.getTaskById(changes['taskIdUpdate'].currentValue);
  }

  updateTask (data: Task) {
    this.clickTaskUpdate.emit();
    this.appHttpService.updateTaskById(this.taskIdUpdate, data)
      .subscribe(data => this.taskIdUpdate = data.id);
  }

}
