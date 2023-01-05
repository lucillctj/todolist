import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
import { Task } from 'app/models/todolist';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnChanges {
  selectedTask = 'ff';
  task$: Observable<Task>;

  @Input() taskId: number;

  constructor(private appHttpService: AppHttpService) { }

  // openTaskDetail() {
  //   this.task$;
  // }

  ngOnChanges(changes: SimpleChanges) {
    this.task$ = this.appHttpService.getTaskById(changes['taskId'].currentValue);
    console.log(this.task$);
  }
}
